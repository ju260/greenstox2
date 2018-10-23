import React, {Component} from 'react';
import Filtres from './filtres';

/*import MyDashboard from './myDashboard';
*/
import MyStocks from './MyStocks';
//import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to GreenStoX</h1>
        </header>
        {/*<MyDashboard/>*/}
        <Filtres/>
        {/* <MyStocks/> */}
      </div>
    );
  }
}

export default App;
