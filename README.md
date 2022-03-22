### Library for parsing transaction input data
[Repository link](https://github.com/Misir8/input-parse-tools)
```npm 
npm i hex-input-tools save
```
```javascript
const prettyHex = require('hex-input-tools');



prettyHex(abi, input)
    .then(console.log);
//response 
{
    methodName,
    paramsLength,
    paramsKeys,
    paramsTypes,
    paramsValues,
    readibleView
}
```