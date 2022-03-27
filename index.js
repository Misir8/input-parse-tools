const InputDataDecoder = require('ethereum-input-data-decoder');

class InputHexTools {
    contract;
    constructor(web3, abi, contractAddress) {
        this.web3 = web3;
        this.abi = abi;
        this.contractAddress = contractAddress;
        this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
    }

    prettyHex(input) {
        const decoder = new InputDataDecoder(this.abi);
        const decodedData = decoder.decodeData(input);
        decodedData.inputs =  decodedData.inputs.map((item) => item?._isBigNumber ? this.web3.utils.hexToNumberString(item._hex) : item);
        return {
            methodName: decodedData.method,
            paramsLength: decodedData.inputs.length,
            paramsTypes: decodedData.types,
            paramsValues: decodedData.inputs,
            readableView: `${decodedData.method}(${decodedData.inputs.map((input, i) => decodedData.names[i] + ': ' + input).join(', ')})`
        };
    }

     getContractAPI() {
        const data = this.contract._jsonInterface;
        const read = [];
        const write = [];
        const events = [];
        data.forEach((item) => {
            const isRead = item.stateMutability === 'view' || item.stateMutability === 'pure' || item.stateMutability === "constant";
            if (item.type === 'function') {
                if (isRead) {
                    read.push({[item.name]: {inputs: item.inputs}});
                } else {
                    write.push({[item.name]: {inputs: item.inputs}});
                }
            } else if (item.type === 'event') {
                events.push({[item.name]: {inputs: item.inputs}});
            }
        });

        return {read, write, events};
    }

    async getEvents(params) {
        const { eventName, walletAddress, fromBlock, takeBlock } = params;
        const filter = {};
        if (walletAddress) {
            filter.from = walletAddress;
        }
        return await this.contract.getPastEvents(eventName, {filter, fromBlock, toBlock: fromBlock + takeBlock});
    }
}

module.exports = InputHexTools;