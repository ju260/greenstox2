import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class DetailStock extends Component {

  constructor() {
    super();

    this.sate = {
      chart1W: [],
      chart1M: [],
      chart1Y: [],
    }


  }

  componentWillMount() {
    const stockId = this.props.match.params.id;

    axios.post(`http://localhost:3000/detailStock/${stockId}`, { stockId })
      .then(res => {
        //console.log(res);
       // console.log(res.data);
        var obj = res.data;
      //   this.state = res.data;
      //   console.log('this.state.chart1W     '+this.state);

      let tabObj;
      let chart;

       //  console.log("state     "+typeof(obj[0].date));
      tabObj = obj.map((x) => {
        let date = x.date.substr(0,10);
        return ([date, x.close])});
        
      chart = [['date', 'price'], ...tabObj];
        //console.log(chart);
        this.setState({ chart1M: chart });
       // this.state = chart1M;
      // console.log("c2     "+c2);
      })

      axios.post(`http://localhost:3000/detailStock-2/${stockId}`, { stockId })
      .then(res => {
        console.log(res);
       // console.log(res.data);
        var obj = res.data;
      
      })
  }

  render() {
    let graph=null;
     if (this.state != null) {
       const { chart1M =[] } = this.state;
     //  console.log(chart1M);
        graph = <Chart width={'600px'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>} data={chart1M} options={{hAxis: {format: 'yy/M/d',title: 'Date',}, vAxis: {title: 'Price ( dollards )',},}} rootProps={{ 'data-testid': '1' }}/> ;
     }
  
    return (
      <div className="DetailStock">
        DetailStock 

      <p><Link to={"/" } >return</Link></p>
      <p>nom stock</p>
      <p>price</p>
      <p>variation</p>

        {graph}
          {/* <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          // data={[
          //   chart1M
          // ]}
          data={
            this.state.chart1M
          }
          options={{
            hAxis: {
              title: 'Time',
            },
            vAxis: {
              title: 'Popularity',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        /> */}


      </div>
    )
  }
}
