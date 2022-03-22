const InputDataDecoder = require('ethereum-input-data-decoder');

class InputHexTools {
    constructor(web3, abi, input, contractAddress) {
        this.web3 = web3;
        this.abi = abi;
        this.input = input;
        this.contractAddress = contractAddress
    }

    async prettyHex() {
        const decoder = new InputDataDecoder(this.abi);
        const decodedData = decoder.decodeData(this.input);
        decodedData.inputs =  decodedData.inputs.map((item) => item?._isBigNumber ? this.web3.utils.hexToNumberString(item._hex) : item);
        return {
            methodName: decodedData.method,
            paramsLength: decodedData.inputs.length,
            paramsTypes: decodedData.types,
            paramsValues: decodedData.inputs,
            readableView: `${decodedData.method}(${decodedData.inputs.map((input, i) => decodedData.names[i] + ': ' + input).join(', ')})`
        };
    }

    async getContactApi() {
        return this.web3.Contract(this.abi, this.contractAddress);
    }
}

module.exports = InputHexTools;