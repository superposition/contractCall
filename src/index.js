import React from 'react';
import ReactDOM from 'react-dom';
import Display from "./Display"
import Select from 'react-select'
import './index.css';
import * as serviceWorker from './serviceWorker';


function App() {
  return (
    <Display/>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
