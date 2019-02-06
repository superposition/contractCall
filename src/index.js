import React from "react";
import styled from "styled-components";
import { render } from "react-dom";
import abi_import from "./abi.json";
import DropdownButton, {
  DropDownButtonWrapper,
  DropDownItem
} from "./DropdownButton";

console.log(JSON.stringify(abi_import));
var abi = JSON.stringify(abi_import);
console.log(abi.entry);

const ButtonGroup = styled.div`
  font-family: sans-serif;
  text-align: right;
  display: flex;
  padding: 0.5em;
  min-width: 250px;


  & > ${DropDownButtonWrapper} + ${DropDownButtonWrapper} {
    margin-left: 2rem;
  }
`;
const Papaya = styled.input`
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const getItems = () => {

  let temp = getAllMethods(abi_import);
  var items = [];
  for(var i=0;i<temp.length;i++){
    items.push(new DropDownItem(temp[i], i));
  }
 
  items.push(new DropDownItem("Item 2", 2));
  //for (var i = 0; i < temp.length; i++) {items.push(temp[i],i)}
  return items;
};

const getMethodProperties = abc => {
  var object = {};
  var n;
  for (var i = 0; i < abi.abi.length; i++) {
    n = abi.abi[i].name;

    object[n] = abi.abi[i];
    console.log(object.n);
  }
  return object;
};

const getAllMethods = abi => {
  var n;
  var object = [];

  for (var i = 0; i < abi.abi.length; i++) {
    console.log("ajsdfosajpfeoijwepoijf");
    n = abi.abi[i].name;
    object.push(n);
    console.log(n);
  }
  return object
};

const getFunctions = () => {
  let items = [];
  items.push(new DropDownItem("Item 3", 1));
  items.push(new DropDownItem("Item 4", 2));

  return items;
};

const handleAction = item => console.log("item selected", item);

const App = () => (
  <ButtonGroup>
    <DropdownButton items={getFunctions()} onSelect={handleAction}>
      Contracts
    </DropdownButton>

    <DropdownButton items={getItems()} onSelect={handleAction}>
      Functions
    </DropdownButton>

    <Papaya />
  </ButtonGroup>
);

render(<App />, document.getElementById("root"));


// var payload = 0;
// console.log(Json.string(abi.inputs) + " " + abi);

// {
//   "constant": true,
//     "inputs": [],
//       "name": "name",
//         "outputs": [
//           {
//             "name": "",
//             "type": "string"
//           }
//         ],
//           "payable": false,
//             "stateMutability": "view",
//               "type": "function"
// },
