### Library for parsing transaction input data in the binance network
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