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

const componentDidMount = async () => {
  state = { methods: "" };
};
// var abi = require("./abi.json");
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

const ButtonGroup = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: flex;

  & > ${DropDownButtonWrapper} + ${DropDownButtonWrapper} {
    margin-left: 1rem;
  }
`;

const getItems = () => {
  let temp = this.getAllMethods(abi_import);
  var items = [];
  items.push(new DropDownItem("Item 1", 1));
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
  this.setState({ methods: object });
};
const getItems2 = () => {
  let items = [];
  items.push(new DropDownItem("Item 3", 1));
  items.push(new DropDownItem("Item 4", 2));

  return items;
};

const handleAction = item => console.log("item selected", item);

const App = () => (
  <ButtonGroup>
    <DropdownButton items={getItems()} onSelect={handleAction}>
      Some Button
    </DropdownButton>
    <DropdownButton items={getItems2()} onSelect={handleAction}>
      Some Button 2
    </DropdownButton>
  </ButtonGroup>
);

render(<App />, document.getElementById("root"));
