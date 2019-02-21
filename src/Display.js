import React, { Component } from 'react';
import Select from 'react-select'
import styled, { createGlobalStyle } from "styled-components";
import wallet from "ethereumjs-wallet"
import TX from 'ethereumjs-tx'
import { closestIndexTo } from 'date-fns';
import back from './assets/Background/Gradient/Purple.svg'
import logo from './assets/Wordmark/B/Gradient.svg'
const path = window.require('path');
const fs = window.require('fs');
const imgWidth = 100

//  border: solid 1px blue;
const Contract_DIR = './src/abi';
const Wallet_DIR = './src/wallets'
const Sidebar = styled.div`
  grid-area: sidebar;
  grid-area: 2/1/5/5;
  padding: 15px;
  text-align: left;
`;

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

//border: solid 2px red;
const Main = styled.main`
background-image: url(${back});
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(20, 1fr);
  background-color: #2d2d2d;
`;

//  border: solid 2px indigo;
const Content = styled.div`
  grid-area: 2/5/20/20;
  padding: 15px;
`;

//  border: solid 1px blue
const Header = styled.div`
  grid-area: header;
  grid-area: 1/1/1/18;
  padding: 15px;
  text-align: left;
`;

const Papaya = styled.input`
  min-width: 200px;
  box-shadow: 10px 16px 32px 0px rgba(0,0,0,0.2);
  padding: 0.3em;
  margin: 0.4em;
  color: blue;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const customStyles = {

  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: 'black',
    padding: 20,
  }),

  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 100,
  }),

  singleValue: (provided, state) => {

    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class Display extends Component {

  componentDidMount() {
    console.log(fs)
    let wallets = fs.readFileSync('./src/wallets/accounts.json', 'utf8')
    console.log(wallets)
    wallets=JSON.parse(wallets)
    console.log(wallets)
   let  accountlist=[]
    for(var i=0;i<wallets.accounts.length;i++){
      console.log(wallets.accounts[i])
      let temp="0x"+wallets.accounts[i].address
      accountlist.push({"value":i,"label":temp})
    }
    console.log(accountlist)
    this.setState({accounts:wallets,addresslist:accountlist})

    fs.readdir(Contract_DIR, (err, items) => {
      console.log("items: " + items[0].slice(0, -5));
      let temp = []
      for (var i = 0; i < items.length; i++) {
        temp[i] = { value: items[i].slice(0, -5), label: items[i].slice(0, -5) }
      }
      console.log(temp)
      this.setState({ contracts: temp })
    });
  } 

  SaveWallet=()=>{
    var buf=Buffer.from(this.state.privatekey,'hex')
    var w= wallet.fromPrivateKey(buf)
    let  address=w.getAddressString()
    let Accounts=this.state.accounts
    console.log(this.state.password)
   let V3=w.toV3(this.state.password)
   Accounts.accounts.push(V3)
   this.setState({accounts:Accounts})
   console.log(Accounts)
   let V3String=JSON.stringify(Accounts)
   const data = new Uint8Array(Buffer.from(V3String));
fs.writeFile('./src/wallets/accounts.json', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
}
  SaveContract=()=>{
   let ABI=this.state.temporaryABI;
   let address=this.state.TempAddress;
  
   let name=this.state.ContractSaveName
   console.log(ABI)
   ABI.address=address
   console.log(ABI)
   let StringABI=JSON.stringify(ABI)
   const data = new Uint8Array(Buffer.from(StringABI));
   let path='./src/abi/'+name+'.json'
   fs.writeFile(path, data, (err) => {
     if (err) throw err;
     console.log('The file has been saved!');
   });

  }
  CreateTX(nonce,gasPrice,gasLimit,value,to,data,pk){
    const tx = new TX(null, 1);
    tx.nonce = nonce
    tx.gasPrice = gasPrice
    tx.gasLimit = gasLimit
    tx.value = value
    // console.log(tx.gasPrice.toString('hex') + 'gasprice')
    console.log(pk)
      tx.to=to
      // console.log('notcontract')
    
    if(data.length>2){  
    tx.data = data
    }
    // const pk = Buffer.from(privateKey, 'hex')
    console.log(tx)
    tx.sign(pk)
    const ret="0x"+tx.serialize().toString('hex')
    return ret
  }
  SaveFile =async(event)=> {
    let file = event.target.files[0];
    console.log(file);
    let f= new FileReader()
    f.onload = this.onReaderLoad;
    await f.readAsText(file)
    

  }
  onReaderLoad=(event)=>{
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    let temp={"abi":'',"address":''}
    temp.abi=obj.abi
    console.log(obj.abi)
    console.log(temp)
    this.setState({temporaryABI:temp})
    //alert_data(obj.name, obj.family);

  }
  state = {

    name: "display this here",

    options: [
      {
        value: 'My Contracts',
        label: 'My Contracts'
      },
      {
        value: 'Upload Account',
        label: 'Upload Account'
      },
      {
        value: 'Unlock Account',
        label: 'Unlock Account'
      },
      {
        value: 'Add New Contract',
        label: 'Add New Contract'
      }
    ],

    optionSelected: 1,

    accounts: [{
      value: '0x',
      label: 'Account 1'
    }],

    contracts: [{
      value: 'Balehu',
      label: 'Contract 1'
         }],

    functions: [
      {
        value: 'Send',
        label: 'send'
      }
    ],
    getfunctions: [{
      value: '',
      label: '',
    }],
    functionabi: [],
    viewfunctionABI: [],
    selectedAccount: "0x",

    selectedID:'',

    selectedContract: "No Contract Selcted",

    selectedFunction: "No Function Selcted",

    selectedFunctionABI:{"inputs":[]},

    selectedViewFunction: "No Function Selcted",

    selectedViewFunctionABI:{"inputs":[]},

    password: '',

    files: '',

    privatekey:'',

    passworkd:'',

    addresslist:'',
    addressmap:'',
    temporaryABI:'',
    ContractSaveName:'',
    TempAddress:''
    
  }

  onSelcted = (event) => {

    console.log(event)

    if (event.value === 'My Contracts') {
      this.setState({
        optionSelected: 1
      })
    }

    if (event.value === 'Upload Account') {
      console.log("option 2")
      this.setState({
        optionSelected: 2
      })
    }

    if (event.value === 'Unlock Account') {
      this.setState({
        optionSelected: 3
      })
    }

    if (event.value === 'Add New Contract') {
      this.setState({
        optionSelected: 4
      })
    }
  }

  handleAccount = (event) => {
    console.log(event)
    this.setState({selectedAccount:event.label,selectedID:event.value})
  }

  handleFile = (event) => {
    console.log(event.value)
    let abi = event.value + '.json'
    let viewFunctions = []
    let selectView = []
    let selectMut = []
    let mutableFunctions = []
    console.log(abi)
    let abiPath = path.join(Contract_DIR, abi)
    console.log(abiPath)
    let data = ""
    try {
      data = fs.readFileSync(abiPath, 'utf8')
    } catch (err) {
      console.log(err)
    }
    data = JSON.parse(data)
    console.log(typeof (data))
    console.log(data)
    for (var i = 0; i < data.abi.length; i++) {
      if (data.abi[i].stateMutability == "view") {
        console.log(data.abi[i] + "view function")
        viewFunctions[data.abi[i].name] = data.abi[i]
        selectView.push({ value: data.abi[i].name, label: data.abi[i].name })
      } else {
        console.log(data.abi[i])
        mutableFunctions[data.abi[i].name] = data.abi[i]
        selectMut.push({ value: data.abi[i].name, label: data.abi[i].name })
      }
      console.log(viewFunctions)
      console.log(selectMut)

    }
    this.setState({ selectedContract: event.value, functions: selectMut, getfunctions: selectView, functionabi: mutableFunctions, viewfunctionABI: viewFunctions }, console.log(this.state))

  }

  handleFunction = (event) => {
    console.log(event.value)
    console.log(this.state.functionabi[event.value])
    let func=this.state.functionabi[event.value]
    console.log(func.inputs)
    this.setState({ selectedFunction: event.value,selectedFunctionABI:func })
  }
  handleViewFunction = (event) => {
    console.log(event.value)
    let func=this.state.viewfunctionABI[event.value]
    console.log(func)
    this.setState({ selectedViewFunction: event.value,selectedViewFunctionABI:func })
    if(func.inputs.length==0){

    }
  }
  handleChange = (fieldName, event) => {
    const state = {
      ...this.state,
    };
    state[fieldName] = event.target.value;
    this.setState(state);
    console.log(state)
  };
  AddAddress=()=>{

  }
  UnlockAccount=async()=>{
   let index=this.state.selectedID
   let password=this.state.password
   let encryptedwallet=this.state.accounts.accounts[index]
   console.log(encryptedwallet+ "wallet&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
   let w= await wallet.fromV3(encryptedwallet,password)
   console.log(w.getPrivateKeyString())
   this.setState({privatekey:w.getPrivateKeyString()},console.log(this.state))

  }

  

  render() {

    console.log(this.state.optionSelected)
    console.log(this.state.selectedContract)
    var mainView = null
    var inputView=null
    var inputView2=null
   console.log(JSON.stringify(this.state.selectedFunctionABI) + "selecte function ABI")

    inputView = (
      <form >
          {this.state.selectedFunctionABI.inputs.map(index => (
              <Papaya type="text" placeholder={index.name}></Papaya>
          ))}
          
      </form>
    )
    inputView2 = (
      <form >
          {this.state.selectedViewFunctionABI.inputs.map(index => (
              <Papaya type="text" placeholder={index.name}></Papaya>
          ))}
          
      </form>
    )
    console.log(inputView)
    if (this.state.optionSelected === 1) {
      mainView = (
        <div data-tid="container">
          <h2>Call Contract Function</h2>

          ABI<br /><br />
          <Select
            value={this.state.selectedContract}
            onChange={this.handleFile}
            options={this.state.contracts}
            styles={customStyles}
            placeholder={this.state.selectedContract} />
          <br />
          Function:<br /><br />
          <Select
            value={this.state.selectedFunction}
            onChange={this.handleFunction}
            options={this.state.functions}
            styles={customStyles}
            placeholder={this.state.selectedFunction}
          />

          <br /><br />
          {inputView}
          View Function:<br /><br />
          <Select
            value={this.state.selectedFunction}
            onChange={this.handleViewFunction}
            options={this.state.getfunctions}
            styles={customStyles} />
        <br /><br />
        {inputView2}
        </div>
      )
    }
    if (this.state.optionSelected === 2) {
      mainView = (
        <div>
          <h3>upload a new private key</h3>
          <input type='text' value={this.state.privatekey} onChange={this.handleChange.bind(this,'privatekey')}/>
          <h3>Enter a Key Password</h3>
          <input type='text' value={this.state.password} onChange={this.handleChange.bind(this,'password')}/>
          <br /><br />
          <button type="button" onClick={this.SaveWallet}>Save Wallet</button>
        
        </div>)
    }
    if (this.state.optionSelected === 3) {
      mainView = (
        <div>
          <br /><br />
          Select Account:<br /><br />
          <Select
            placeholder={this.state.selectedAccount}
            onChange={this.handleAccount}
            options={this.state.addresslist}
            styles={customStyles}
          />
          <br />
          <h3>Enter your Password</h3>
          <input type='text' value={this.state.password} onChange={this.handleChange.bind(this,'password')}/>
          <br /><br />
          <button type="button" onClick={this.UnlockAccount}>Unlock</button>
        </div>)

    }
    if (this.state.optionSelected === 4) {
      mainView = (
        <div>
          <h3>upload the contract ABI</h3>
          <input type='file' onChange={this.SaveFile} />
          <h3>Enter the contract Address</h3>
          <input type='text' onChange={this.handleChange.bind(this,'TempAddress')}/>
          <h3>Enter the contract Name</h3>
          <input type='text' onChange={this.handleChange.bind(this,'ContractSaveName')}/>
          <button type="button" onClick={this.SaveContract}>Save it</button>
        </div>)
      console.log("changing mainview")
    }

    console.log(mainView)
    return (
      <React.Fragment>
        <GlobalStyle />
        <Main>
          <Header> <img width={imgWidth} src={logo} alt={"logo-image"} /></Header>
          <Content>
            <div>
              {mainView}
              
            </div>
          </Content>
          <Sidebar>
            <h1>Select Mode</h1>
            <Select
              options={this.state.options}
              onChange={this.onSelcted}
              styles={customStyles} />
          </Sidebar>
        </Main>
      </React.Fragment>
    );
  }
}

export default Display;
