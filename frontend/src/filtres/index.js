import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import InputRange from 'react-input-range';
import Button from '@material-ui/core/Button';
import Radio from './Radio';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DetailStock from '../detailStock/DetailStock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { Table, Tr, Td, Thead } from "reactable";


import './filtres.css';
import 'react-table/react-table.css';
import 'react-input-range/lib/css/index.css';
import SearchForm from './SearchForm';


class Filtres extends React.Component {

    constructor() {
        super();

        this.state = {
            stocks: []
        }
        this.columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'perRatio',
            accessor: 'perRatio' // String-based value accessors!
        }, {
            Header: 'dividendYield',
            accessor: 'dividendYield' // String-based value accessors!
        }, {
            Header: 'Symbol',
            accessor: 'symbol' // String-based value accessors!
        }]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.data = {
            per: 0,
            ebitdata: 0,
            dividendYiel: 0,
            leverage: 0
        }

        this.sate = {
            shown: "none",
            submitted: false,
            symbolClicked: ""
        }
    }

    handleSubmit(values) {
        console.log(values)

        this.data.per = values.per !== undefined ? values.per : 0;
        this.data.dividendYiel = values.dividendYiel !== undefined ? values.dividendYiel : 0;

        //this.data.ebitdata = this.state.ebitdata;
        // this.data.leverage = this.state.leverage;

        console.log(process.env.REACT_APP_API_URL)

        this.stocks = [];
        // console.log(data)
        let self = this;
        fetch(process.env.REACT_APP_API_URL + '/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.data)
        }).then(function (response) {
            //console.log('response' + response)
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();
        }).then(function (data) {
            // console.log(data)
            self.setState({ stocks: data, shown: "block" });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var shown = {
            display: this.state.shown ? "block" : "none"
        };

        const { stocks = [] } = this.state;

        let route = null;
        if (stocks.length > 0) {
            route = <Route path="/detailStock/:id" component={DetailStock} />
        }

        return (
            <div>
                <SearchForm onSubmit={this.handleSubmit} />

                <Table sortable={true} className="table" itemsPerPage={30} pageButtonLimit={5} >
                    {stocks.map((t) => (<Tr><Td column="symbol"><Link to={{pathname:"/detailStock/" + t.symbol, state:{symbol:t.symbol, name:t.name} }} >{t.symbol}</Link></Td><Td column="perRatio">{t.perRatio}</Td><Td column="name">{t.name}</Td><Td column="dividendYield">{t.dividendYield}</Td></Tr>))}
                </Table>
                {/* <ReactTable data={this.state.stocks} columns={this.columns} style={shown}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    //this2.data.symbolClicked = rowInfo.original.symbol;
                                    var this2 = this;
                                    this2.setState({ symbolClicked: rowInfo.original.symbol });

                                    // fetch(process.env.REACT_APP_API_URL + '/detailStock', {
                                    //     method: 'POST',
                                    //     headers: { 'Content-Type': 'application/json' },
                                    //     body: JSON.stringify(this.data)
                                    // }).then(function (response) {
                                    //     //console.log('response' + response)
                                    //     if (response.status >= 400) {
                                    //         throw new Error("Bad response from server");
                                    //     }

                                    //     return response.json();
                                    // }).then(function (data) {
                                    //     //console.log(data)
                                    //     //self.setState({ stocks: data, shown: "block" });
                                    //     this2.setState({ submitted: true });

                                    // }).catch(err => {
                                    //     console.log('caught it!', err);
                                    // })

                                },
                                style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                        } else {
                            return {}
                        }
                    }}
                />

                 */}
                {/* {route} */}
                
            </div>
        );
    }
};


export default Filtres;
