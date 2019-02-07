import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import styles from './styles.module.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cx from 'classnames';
var dateFormat = require('dateformat');

export default class DetailStock extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
    const stockId = this.props.match.params.id;

    axios.post(`http://localhost:3000/detailStock/${stockId}`, { stockId })
      .then(res => {
        var obj = res.data;
        let tabObj;
        let chart;

        tabObj = obj.map((x) => {
          let date = x.date.substr(0, 10);
          return ([date, x.close])
        });

        chart = [['date', 'price'], ...tabObj];
        this.setState({ chart1M: chart });
      })

    axios.post(`http://localhost:3000/detailStock-2/${stockId}`, { stockId })
      .then(res => {
        var obj = res.data[0];
        let { name, lastPrice, variation, date } = obj;
        this.setState({ name, lastPrice, variation, date });
      })
  }

  render() {
    let graph, infosName, infosPrice, infosVariation, isPositif ,updateTime, date_newFormat= null;
    if (this.state != null) {
      const { chart1M = [], name, lastPrice, variation,date } = this.state;
      graph = <Chart width={'600px'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>} data={chart1M} options={{ hAxis: { format: 'yy/M/d', title: 'Date', }, vAxis: { title: 'Price ( dollards )', }, }} rootProps={{ 'data-testid': '1' }} />;
      infosName = <h2 className={styles.detailStock__name}>{name}</h2>;
      infosPrice = <div><label className={styles.detailStock__price}>price: <span>{lastPrice}&euro;</span></label></div>;
      variation>0 ? isPositif= true : isPositif=false;
      date_newFormat = dateFormat(new Date(parseInt(date)), "dddd, mmmm dS, yyyy, h:MM:ss TT");
      updateTime = <div><label className={styles.detailStock__updateTime}>mise à jour: </label><span>{date_newFormat}</span></div>
      isPositif ? infosVariation = <div><label className={styles.detailStock__variation}>variation: <span className={cx(styles.detailStock__variationValue, styles.detailStock__positif)} >{variation}</span></label></div> : infosVariation = <div><label className={styles.detailStock__variation}>variation: <span className={cx(styles.detailStock__variationValue, styles.detailStock__negatif)} >{variation}</span></label></div>;      
    }

    return (
      <div className={styles.detailStock}>
        <p className={styles.detailStock__return}><Link to={"/"} >return</Link></p>
        <div className={styles.detailStock__wrapper}>
          <div className={styles.detailStock__infos}>
                {infosName}
                {infosPrice}
                {infosVariation}
                {updateTime}
          </div>
          <div className={styles.detailStock__graph}>{graph}</div>
        </div>
      </div>
    )
  }
}
