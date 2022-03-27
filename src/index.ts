import InputDataDecoder from 'ethereum-input-data-decoder';
import Web3 from 'web3';


export class InputHexTools {
    private readonly web3: Web3;
    private readonly abi: any;
    private readonly contractAddress: string;
    private readonly contract: any;

    constructor(web3: Web3, abi: any, contractAddress: string) {
        this.web3 = web3;
        this.abi = abi;
        this.contractAddress = contractAddress;
        this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
    }

    prettyHex(input: string) {
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
        const read: Array<{[key: string]: any}> = [];
        const write: Array<{[key: string]: any}> = [];
        const events: Array<{[key: string]: any}> = [];
        data.forEach((item: any) => {
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

    async getEvents(params: {
        eventName: string,
        walletAddress: string,
        fromBlock: number,
        takeBlock: number
    }) {
        const { eventName, walletAddress, fromBlock, takeBlock } = params;
        const filter: {[key: string]: any} = {};
        if (walletAddress) {
            filter.from = walletAddress;
        }
        return await this.contract.getPastEvents(eventName, {filter, fromBlock, toBlock: fromBlock + takeBlock});
    }
}
