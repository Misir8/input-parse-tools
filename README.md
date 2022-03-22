### Library for parsing transaction input data
[Repository link](https://github.com/Misir8/input-parse-tools)
```npm 
npm i hex-input-tools save
```
```javascript
const hexInputParse = require('hex-input-tools');



hexInputParse(chain, walletAdress, apiKey, page, offset)
    .then(console.log);
//chain = 'binance' | 'eth'
//response 
[{
    methodName,
    paramsLength,
    paramsKeys,
    paramsTypes,
    paramsValues,
    readibleView,
}]
```