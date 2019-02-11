import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Select from 'react-select'
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
  background-color: cream;
`;

const Sidebar = styled.div`
  grid-area: h;
  border: solid 1px blue;
  grid-area: 3/1/5/5;
  padding: 15px;
  text-align: left;
`;

const Header = styled.div`
  grid-area: header;
  border: solid 1px blue;
  grid-area: 1/1/1/18;
  padding: 15px;
  text-align: left;
`;

const Content = styled.div`
  grid-area: 3/5/8/14;
  border: solid 2px indigo;
  padding: 15px;
  backgroundcolor: pink;
`;

const Footer = styled.div`
  grid-area: footer;
  border: solid 2px green;
  padding: 15px;
  grid- area: 1 / 2 / 2 / 2;
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const FileSelect = () => (
  <Select options={options} />
)


function App() {
  
  return (
    <React.Fragment>
      <GlobalStyle />
      <Main>
        <Header>Header</Header>
        <Content>
        Content
        </Content>
        <Sidebar>
        <FileSelect />
        </Sidebar>
      
      </Main>
    </React.Fragment>
  )
 
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

//<Footer>Footer</Footer>
