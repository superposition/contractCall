import React, { Component } from 'react';
import Select from 'react-select'
import logo from './logo.svg';
import styled, { createGlobalStyle } from "styled-components";
import './App.css';
const Sidebar = styled.div`
  grid-area: h;
  border: solid 1px blue;
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

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(20, 1fr);
  border: solid 2px red;
  background-color: cream;
`;



const Content = styled.div`
  grid-area: 2/5/20/20;
  border: solid 2px indigo;
  padding: 15px;
  backgroundcolor: pink;
`;
const Header = styled.div`
  grid-area: header;
  border: solid 1px blue;
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
class Display extends Component {

  state={name:"display this here",
    options:[
    { value: 'My Contracts', label: 'My Contracts' },
    { value: 'Upload Account', label: 'Upload Account' },
    { value: 'Unlock Account', label: 'Unlock Account' },
    { value: 'Add New Contract', label: 'Add New Contract' }
    ],
    optionSelected:1,
    accounts:[{ value: '0x', label: 'Account 1' }],
    contracts:[{ value: 'Balehu', label: 'Contract 1' }],
    functions:[{value:'Send',label:'send'}],
    selectedAccount:"0x",
    selectedContract:"No Contract Selcted",
    selectedFunction:"No Function Selcted" 
     }


  onSelcted=(event)=>{
    console.log(event)
   if(event.value=='My Contracts'){
      this.setState({optionSelected:1})
   }
   if(event.value=='Upload Account'){
    this.setState({optionSelected:2})
   }
   if(event.value=='Unlock Account'){
    this.setState({optionSelected:3})
   }
   if(event.value=='Add New Contract'){
    this.setState({optionSelected:4})
   }
  }
  handleAccount=(event)=>{

  }
  handleFile=()=>{

  }  

  handleFunction=()=>{
    
  }  
  render() {
   var mainView=(<div><h1>An error has occured</h1></div>)
   if(this.state.optionSelected==1){
     mainView=(<div  data-tid="container">
     <h2>Balehu</h2>
     <br/><br/>
     Account:<br /><br/>
     <Select
             value={this.selectedAccount}
             onChange={this.handleAccount}
             options={this.state.accounts}
           />
     <br/>
     ABI:<br /><br/>
     <Select
             value={this.selectedContract}
             onChange={this.handleFile}
             options={this.state.contracts}
           />
     <br/>
     Function:<br /><br/>	
     <Select
             value={this.selectedFunction}
             onChange={this.handleFunction}
             options={this.state.functions}
           />      
     <br/><br/>
     <Papaya />
     <Papaya />
     <Papaya />
  </div>)
   } 
   if(this.state.optionSelected==2){
     
   } 
   if(this.state.optionSelected==3){
     
   } 
  if(this.state.optionSelected==4){
     
  } 
    return (
      <React.Fragment>
        
      <GlobalStyle />
     
      <Main>
      <Header>Header</Header> 
      <Content>
      <div >
       
      {mainView}  
      </div> 
      </Content>
      <Sidebar>
        <h1>Select Mode</h1>
        <Select options={this.state.options} onChange={this.onSelcted}/>
      </Sidebar>
     
     </Main>
     </React.Fragment>
    );
  }
}

export default Display;
