import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import InputRange from 'react-input-range';
import Button from '@material-ui/core/Button';
import Radio from './Radio';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

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


        // this.state = {
        //     ebitdata: 5,
        //     leverage: 5,
        //     dividendYiel: 2
        // };

        this.sate={
            shown: "none"
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
            //console.log(data)
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
        
        return (
            <div>
                <SearchForm onSubmit={this.handleSubmit} />
                <ReactTable data={this.state.stocks} columns={this.columns} style={ shown } />
            </div>
        );
    }
};


export default Filtres;
