import React, { Component } from 'react';
import Filtres from './filtres';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DetailStock from './detailStock/DetailStock';

/*import MyDashboard from './myDashboard';
*/
import MyStocks from './MyStocks';
//import './App.css';

class App extends Component {
  componentDidMount() {
    document.title = "greenStox"
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to GreenStoX</h1>
        </header>
        {/*<MyDashboard/>*/}
        {/* <Filtres/> */}
        {/* <MyStocks/> */}

        <Switch>
          <Route exact path="/" component={Filtres} />
          <Route exact path="/detailStock/:id" component={DetailStock} />
        </Switch>

      </div>
    );
  }
}

export default App;
