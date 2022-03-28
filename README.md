### Library for parsing transaction input data
[Repository link](https://github.com/Misir8/input-parse-tools)
```npm 
npm i hex-input-tools --save
```
```typescript
import {InputHexTools} from 'hex-input-tools';



const inputhexTools = new InputHexTools(web3, abi, contractAddress)
inputhexTools.prettyHex(input)
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
  write: [{methodName: {inputs: []}}];
  events: [{eventName: {inputs: []}}];
}


inputhexTools.getEvents(params)
```