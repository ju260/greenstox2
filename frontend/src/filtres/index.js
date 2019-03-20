import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
// import { Table, Tr, Td, Thead } from "react-table";
import MaterialTable from 'material-table'
import { BrowserRouter, Route } from 'react-router-dom'

// import InputRange from 'react-input-range';
// import Button from '@material-ui/core/Button';
// import Radio from './Radio';
// import { Field, reduxForm } from 'redux-form';
// import PropTypes from 'prop-types';
// import DetailStock from '../detailStock/DetailStock';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Redirect } from 'react-router-dom';
// import { Table, Tr, Td, Thead } from "reactable";
// import track from 'react-tracking';
import './filtres.css';
// import 'react-table/react-table.css';
import 'react-input-range/lib/css/index.css';
import SearchForm from './SearchForm';



class Filtres extends React.Component {

    constructor() {
        super();

        this.state = {
            stocks: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.data = {
            per: 0,
            ebitdata: 0,
            dividendYiel: 0,
            leverage: 0
        }

        this.sate = {
            shown: false,
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
        let self = this;
        fetch(process.env.REACT_APP_API_URL + '/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();
        }).then(function (data) {
            self.setState({ stocks: data, shown: true });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRowClick = (e, rowData) => {
        this.props.history.push(`/detailStock/${rowData.symbol}`)
    }

    render() {
        var shown = {
            display: this.state.shown ? "block" : "none"
        }
        const { stocks = [] } = this.state;

        let results;
        if (this.state.shown) {
            results = <MaterialTable
                columns={[
                    { title: 'name', field: 'name' },
                    { title: 'symbol', field: 'symbol' },
                    { title: 'per ratio', field: 'perRatio' },
                    { title: 'dividend', field: 'dividendYield' },
                ]}
                data={stocks}
                title=""
                onRowClick={this.onRowClick}
            />
        }

        return (
            <div>
                <SearchForm onSubmit={this.handleSubmit} />
                {results}
            </div>
        );
    }
};



export default Filtres;
