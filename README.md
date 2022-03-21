### Library for parsing transaction input data in the binance network
[Repository link](https://github.com/Misir8/bsc-input-parse)
```javascript
const bscInputParse = require('bsc-input-parse');



bscInputParse(walletAdress, apiKey, page, offset)
    .then(console.log);
//response 
[{
    methodName,
    paramsLength,
    paramsKeys,
    paramsTypes,
    paramsValues,
    readibleView,
}]
