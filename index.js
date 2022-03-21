const axios = require("axios");
const InputDataDecoder = require('ethereum-input-data-decoder');
const Web3 = require('web3');

async function getInputParse(chain, walletAddress, apiKey, page, offset) {
    const methodInfos = [];
    const web3 = new Web3();
    const res = await axios.get(getTransactionsUrl(chain, walletAddress, apiKey, page, offset));
    const transactions = res.data.result;
    for (const transaction of transactions) {
        try {
            const resAbi = await axios.get(getAbiUrl(chain, transaction.to, apiKey));
            const decoder = new InputDataDecoder(JSON.parse(resAbi.data.result));
            const decodedData = decoder.decodeData(transaction.input);
            decodedData.inputs =  decodedData.inputs.map((item) => item?._isBigNumber ? web3.utils.hexToNumberString(item._hex) : item);
            const methodInfo = {
                methodName: decodedData.method,
                paramsLength: decodedData.inputs.length,
                paramsTypes: decodedData.types,
                paramsValues: decodedData.inputs,
                readableView: `${decodedData.method}(${decodedData.inputs.map((input, i) => decodedData.names[i] + ': ' + input).join(', ')})`
            };
            methodInfos.push(methodInfo);
        } catch (e) {
        }
    }
    return methodInfos;
}

function getTransactionsUrl(chain, walletAddress, apiKey, page, offset) {
    if (chain === 'binance') {
        return `https://api.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;
    } else {
        return `https://api.etherscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;
    }
}

function getAbiUrl(chain, to, apiKey) {
    if (chain === 'binance') {
        return `https://api.bscscan.com/api?module=contract&action=getabi&address=${to}&apikey=${apiKey}`
    } else {
        return `https://api.etherscan.com/api?module=contract&action=getabi&address=${to}&apikey=${apiKey}`
    }
}

module.exports = getInputParse;