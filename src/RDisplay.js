import React, { Component } from 'react';



import Display from './Display'
import Selector from './Selector'
import { Route, Switch, BrowserRouter  } from 'react-router-dom';

class RDisplay extends Component {
render(){


  return(
    <BrowserRouter>
    <div>
     
        <div>

            <Switch>
              <Route path="/" exact component={Display}/>
              <Route path="/Selector" exact component={Selector}/>
              
           </Switch>
        </div>

  </div>
 </BrowserRouter>
  )
}


}

export default RDisplay;
