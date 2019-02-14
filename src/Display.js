import React, { Component } from 'react';
import Select from 'react-select'
import styled, { createGlobalStyle } from "styled-components";

var fs = require('browserify-fs');
//  border: solid 1px blue;

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

  componentDidMount(){

    fs.readdir('.', function(err, items) {
        console.log("items: " + items);

        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
        }
    });

    return null
  }

  state = {

    name: "display this here",

    options:[
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

    accounts:[{
      value: '0x', 
      label: 'Account 1' 
    }],

    contracts:[{
      value: 'Balehu',
      label: 'Contract 1'
    }],

    functions:[
      {
        value:'Send',
        label:'send'}
    ],

    selectedAccount: "0x",

    selectedContract: "No Contract Selcted",

    selectedFunction: "No Function Selcted",

    password: '' 
  }

  onSelcted = (event) => {

    console.log(event)

    if (event.value === 'My Contracts' ) {
      this.setState ({
        optionSelected: 1
      })
    }
    
    if (event.value === 'Upload Account') {
      console.log("option 2")
      this.setState({
        optionSelected: 2
      })
    }

    if (event.value ==='Unlock Account'){
      this.setState({
        optionSelected: 3
      })
    }

    if (event.value === 'Add New Contract'){
      this.setState({
        optionSelected: 4
      })
    }
  }

  handleAccount = (event) => {
  }

  handleFile = (event) => {
  }  

  handleFunction = (event) => {
    
  }  

  render(){

  console.log(this.state.optionSelected)

  var mainView=null

  if ( this.state.optionSelected === 1 ) {
    mainView = (
      <div  data-tid="container">
        <h2>Call Contract Function</h2>
       
        ABI<br/><br/>
        <Select
                value={this.selectedContract}
                onChange={this.handleFile}
                options={this.state.contracts}
                styles={customStyles}/>
        <br/>
        Function:<br /><br/>	
        <Select
                value={this.selectedFunction}
                onChange={this.handleFunction}
                options={this.state.functions}
                styles={customStyles}/>      
        <br/><br/>
        <Papaya />
        <Papaya />
        <Papaya />
      </div>
  )
  } 
  if(this.state.optionSelected===2){
    mainView=(
    <div>
      <h3>upload a new private key</h3>
    <input type='file'/>
    <h3>Enter a Key Password</h3>
    <input type='text'/>
    </div>)
    console.log("changing mainview") 
  } 
  if(this.state.optionSelected===3){
    mainView=(
      <div>
        <br/><br/>
        Select Account:<br /><br/>
       <Select
               value={this.selectedAccount}
               onChange={this.handleAccount}
               options={this.state.accounts}
               styles={customStyles}
             />
        <br/>
        <h3>Enter your Password</h3>
        <input type='text'/>
        </div>)
       
     } 
    if(this.state.optionSelected === 4){
      mainView = (
        <div>
          <h3>upload the contract ABI</h3>
        <input type='file'/>
        <h3>Enter the contract Address</h3>
        <input type='text'/>
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
                styles={customStyles}/>
            </Sidebar>
         </Main>
       </React.Fragment>
      );
    }
}

export default Display;
