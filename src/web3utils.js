import TX from 'ethereumjs-tx'

function CreateTX(nonce,gasPrice,gasLimit,value,to,data,pk){
    
    const tx = new TX(null, 1);
    tx.nonce = nonce
    tx.gasPrice = gasPrice
    tx.gasLimit = gasLimit
    tx.value = value
    // console.log(tx.gasPrice.toString('hex') + 'gasprice')
    console.log(pk)
    
    tx.to=to
      // console.log('notcontract')
    
    if (data.length > 2){  
      tx.data = data
    }
    // const pk = Buffer.from(privateKey, 'hex')
    
    console.log(tx)
    tx.sign(pk)
    const ret="0x"+tx.serialize().toString('hex')
    return ret
  }

  export async function SendWeb3Transaction(functionABI,inputarray,fromAddress,PrivateKey,contract,web3){
      var nonce= await web3.eth.getTransactionCount(fromAddress)
      var DATA=web3.eth.abi.encodeFunctionCall(functionABI,inputarray)
      let TXData=CreateTX(nonce,'0x4a817c800',1000000,0,contract,DATA,PrivateKey)
      let hash= await web3.ethsendSignedTransaction(TXData)
      console.log(hash)

  }

  export async function CallContractFunction(functionABI,inputarray,contract,web3,type){
    
    var DATA = web3.eth.abi.encodeFunctionCall(functionABI,inputarray)
    const transactionObject = {
        to:contract,
        DATA,
    }
    console.log(transactionObject)
    console.log(web3)
    var result = await web3.eth.call(transactionObject)   
    
    if(typeof(result)==='string'){
      console.log(type[0])
      result =web3.eth.abi.decodeParameter(type[0],result )
      console.log(result)
    }
    return result
  }

  export function FormatABI(object){
    let returnObject={}
    console.log(object)
    returnObject.name=object.name
    returnObject.type=object.type
    returnObject.inputs=object.inputs
    
    console.log(returnObject)
    return returnObject;

  }
  export function formatOutputs(object){
     var outputArray=[]
     console.log(object.outputs)
     let outputs=object.outputs
     console.log(outputs.length)
     for(var i=0;i<outputs.length;i++){
       outputArray.push(outputs[i].type)
     }
     console.log(outputArray)
     return outputArray
  }
  function decodeResult(result,type){
  
  }