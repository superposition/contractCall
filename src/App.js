import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import styled, { createGlobalStyle } from "styled-components";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const Main = styled.main`

  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(12, 1fr);
  border: solid 2px red;
`;

class App extends Component {
  state={name:"display this here"}
  render() {
    return (
      <div className="App">
          <GlobalStyle />
          <Main>
            <Header>Header</Header>
            <Content>Content</Content>
            <Sidebar>
            </Sidebar>
            <Footer>Footer</Footer>
          </Main>
        
      </div>
    );
  }
}

export default App;
