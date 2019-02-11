import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import styled, { createGlobalStyle } from "styled-components";

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

const Sidebar = styled.div`
  grid-area: h;
  border: solid 1px blue;
  grid-area: 1/1/1/18;
  padding: 15px;
  text-align: right;
`;

const Header = styled.div`
  grid-area: h;
  border: solid 1px blue;
  grid-area: 1/1/1/18;
  padding: 15px;
  text-align: right;
`;

const Content = styled.div`
  grid-area: 2/1/15/16;
  border: solid 2px indigo;
  padding: 15px;
  backgroundcolor: pink;
`;

const Footer = styled.div`
  grid-area: footer;
  border: solid 2px green;
  padding: 15px;
  grid- area: 12 / 2 / 13 / 7;
`;


function App() {
  
  return (
    <React.Fragment>
      <GlobalStyle />
      <Main>
        <Header>Header</Header>
        <Content>Content</Content>
        <Sidebar>
        </Sidebar>
        <Footer>Footer</Footer>
      </Main>
    </React.Fragment>
  )
  
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
