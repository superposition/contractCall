import React, { Component } from 'react';
import Select from 'react-select'
import styled, { createGlobalStyle } from "styled-components";
import wallet from "ethereumjs-wallet"
import TX from 'ethereumjs-tx'
import { closestIndexTo } from 'date-fns';
const path = window.require('path');
const fs = window.require('fs');

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
    //let data = fs.fSync('/home/john/BalehuCode/contractCall/src/abi.json', 'utf8')
    //console.log(data)
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
   SaveWallet(){
  var buf=Buffer.from(this.state.privatekey,'hex')
  var w= wallet.fromPrivateKey(buf)
    let  address=w.getAddressString()
   let V3=w.toV3(this.state.password)
   console.log(V3)
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
  SaveFile(event) {
    let file = event.target.files[0];
    console.log(file);

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

    selectedContract: "No Contract Selcted",

    selectedFunction: "No Function Selcted",

    selectedFunctionABI:{"inputs":[]},

    selectedViewFunction: "No Function Selcted",

    selectedViewFunctionABI:{"inputs":[]},

    password: '',

    files: '',

    privatekey:'',

    passworkd:'',
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
          <input type='file' />
          <h3>Enter a Key Password</h3>
          <input type='text' />
        </div>)
      console.log("changing mainview")
    }
    if (this.state.optionSelected === 3) {
      mainView = (
        <div>
          <br /><br />
          Select Account:<br /><br />
          <Select
            value={this.selectedAccount}
            onChange={this.handleAccount}
            options={this.state.accounts}
            styles={customStyles}
          />
          <br />
          <h3>Enter your Password</h3>
          <input type='text' />
        </div>)

    }
    if (this.state.optionSelected === 4) {
      mainView = (
        <div>
          <h3>upload the contract ABI</h3>
          <input type='file' onChange={this.SaveFile} />
          <h3>Enter the contract Address</h3>
          <input type='text' />
        </div>)
      console.log("changing mainview")
    }

    console.log(mainView)
    return (
      <React.Fragment>
        <GlobalStyle />
        <Main>
          <Header>Header</Header>
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
