// @flow
import React, { Component } from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import styled, { css } from "styled-components";
import Select from 'react-select';
import fs from "fs";


const options = [
  { value: '../abi/abi.json', label: 'ABI 1' },
  { value: '../abi/abi2.json', label: 'ABI 2' },
  { value: '../abi/abi3.json', label: 'ABI 3' }
];

type Props = {};

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

const BASE_DIR = './app/abi';

function getFiles(dir) {
 let retFiles = [];
  fs.readdir(BASE_DIR, function(e, contents) {
    console.log("contents", contents)
    retFiles.push(contents);
  });
  return retFiles;
}

export default class Home extends Component<Props> {

  props: Props;

  state = {
    selectedFile: null,
    selectedAccount: null,
    selectedFunction : null,
    globaloptions: null
  }

  handleFile = (selectedFile) => {
    this.setState({ selectedFile });
    console.log(`File selected:`, selectedFile);
    console.log(`File selected:`, selectedFile.value);
    //console.log(getFiles(selectedFile.value)); //Pass in directory
   	console.log(getFiles(BASE_DIR));
  }

  handleFunction = (selectedFunction) => {
  	this.setState({ selectedFunction });
  	console.log('Function Selected', selectedFunction)
  	console.log('Function Selected', selectedFunction.value)
  }

  handleAccount = (selectedAccount) => {
    this.setState({ selectedAccount });
    console.log('Account Selected', selectedAccount)
    //console.log(':::::', selectedAccount.value)
  }
       
  		 
  componentDidMount(){

  	let initialValues = [];
  	let newObj = null;
    let opt = [];


    var files = getFiles(BASE_DIR); 	

  	let selectedFile = []; 

    console.log("componentDidMount files")
    console.log("neat", getFiles(BASE_DIR))


    getFiles(BASE_DIR).forEach(function (item, index) {
      console.log(item, index);
    });

  	this.setState({ selectedFile });
  	return null;
  }
  render() {

  	function onToggle(isOpen) {
  	  console.log(isOpen);
  	}

  	const { selectedFile } = this.state;
  	const { selectedFunction } = this.state;
    const { selectedAccount } = this.state;

    return (
        <div className={styles.container} data-tid="container">
	        <h2>Balehu</h2>
	        <br/><br/>
          Account:<br /><br/>
          <Select
                  value={selectedFile}
                  onChange={this.handleAccount}
                  options={options}
                />
          <br/>
	        ABI:<br /><br/>
	        <Select
	                value={selectedFile}
	                onChange={this.handleFile}
	                options={options}
	              />
	        <br/>
	        Function:<br /><br/>	
	        <Select
	                value={selectedFunction}
	                onChange={this.handleFunction}
	                options={options}
	              />      
	        <br/><br/>
	        <Papaya />
	        <Papaya />
	        <Papaya />
 	    </div>
    );
  }
}
