const InputDataDecoder = require('ethereum-input-data-decoder');
const Web3 = require('web3');

async function prettyHex(abi, input) {
    const web3 = new Web3();
    const decoder = new InputDataDecoder(abi);
    const decodedData = decoder.decodeData(input);
    decodedData.inputs =  decodedData.inputs.map((item) => item?._isBigNumber ? web3.utils.hexToNumberString(item._hex) : item);
    return {
        methodName: decodedData.method,
        paramsLength: decodedData.inputs.length,
        paramsTypes: decodedData.types,
        paramsValues: decodedData.inputs,
        readableView: `${decodedData.method}(${decodedData.inputs.map((input, i) => decodedData.names[i] + ': ' + input).join(', ')})`
    };
}

module.exports = prettyHex;