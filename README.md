### Library for parsing transaction input data
[Repository link](https://github.com/Misir8/input-parse-tools)
```npm 
npm i hex-input-tools --save
```
```javascript
const InputHexTools = require('hex-input-tools');



const inputhexTools = new InputHexTools(web3, abi, input, contractAddress)
inputhexTools.prettyHex()
//response 
{
    methodName,
        paramsLength,
        paramsKeys,
        paramsTypes,
        paramsValues,
        readibleView
}


inputhexTools.getContractAPI()
//response
{
  read: [{methodName: {inputs: []}}];
  write: [{methodName: {inputs: []}}]
}
```