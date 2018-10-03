import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import InputRange from 'react-input-range';
import './filtres.css';
import 'react-table/react-table.css';
import 'react-input-range/lib/css/index.css';

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
            Header: 'dividendRate',
            accessor: 'dividendRate' // String-based value accessors!
        }, {
            Header: 'Symbol',
            accessor: 'symbol' // String-based value accessors!
        }]

        this.handleSubmit = this
            .handleSubmit
            .bind(this)

        this.data = {
            per: 0,
            ebitdata: 0,
            dividendYiel: 0,
            leverage: 0
        }

        this.state = {
            ebitdata: 5,
            leverage:5,
            dividendYiel:5
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        this.data.per =  document.querySelector('input[name="per"]:checked').length != 0 ? document.querySelector('input[name="per"]:checked').value : 0 ;
        this.data.ebitdata = this.state.ebitdata;
        this.data.dividendYiel = this.state.dividendYiel;
        this.data.leverage = this.state.leverage;

        this.stocks = [];
        // console.log(data)
        let self = this;
        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.data)
        }).then(function (response) {
            console.log('response' + response)
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ stocks: data });
        }).catch(err => {
            console.log('caught it!', err);
        })

    }

    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit} method="POST" action="">
                    <h2>SEARCH STOCKS</h2>
                    <ul className='filtres'>
                        {/*<Filtre />*/}
                        <li className="filtres__li"><input name="checkBoxPer" id="checkBoxPer" type="checkbox" /><label htmlFor="checkBoxPer">PER</label>
                            <div><input id="per1" name="per" type="radio" value="1" /><label htmlFor="per1">0 &lsaquo; PER &lsaquo; 10 <span className="filtres___def">(L'action est sous-évaluée ou les bénéfices de la société sont supposés être bientôt en déclin.)</span></label></div>
                            <div><input id="per2" name="per" type="radio" value="2" /><label htmlFor="per2">10 &lsaquo; PER &lsaquo; 17 <span className="filtres___def">(Pour la majorité des sociétés, un ratio se situant dans cette tranche est considéré comme bon.)</span></label></div>
                            <div><input id="per3" name="per" type="radio" value="3" /><label htmlFor="per3">17 &lsaquo; PER &lsaquo; 25 <span className="filtres___def">(L'action est surévaluée ou il y a croissance des profits depuis les dernières annonces.)</span></label></div>
                            <div><input id="per4" name="per" type="radio" value="4" /><label htmlFor="per4"> 25 &lsaquo; <span className="filtres___def">PER l est probable que de forts profits soient attendus dans le futur, ou l'action fait l'objet d'une bulle spéculative.) </span></label></div></li>
                        {/* <li className="filtres__li"><input name="checkBoxEbitdata" id="checkBoxEbitdata" type="checkbox" /><label >EBITDATA Résultat opérationnel </label>
                            <InputRange
                                maxValue={20}
                                minValue={0}
                                value={this.state.ebitdata}
                                onChange={value => this.setState({ ebitdata: value })}
                            /></li> */}
                        <li class="filtres__li"><input name="checkBoxLeverage" id="checkBoxLeverage" type="checkbox" /><label for="checkBoxLeverage">LEVERAGE (endetement) (Dette/EBITDA)</label>
                            <InputRange
                                maxValue={20}
                                minValue={0}
                                value={this.state.leverage}
                                onChange={value => this.setState({ leverage: value })} /></li>
                        <li class="filtres__li"><input name="checkBoxDividend" id="checkBoxDividend" type="checkbox" /><label for="checkBoxDividend">DIVIDENDS yield ( rendement % )</label>
                            <InputRange maxValue={20}
                                maxValue={20}
                                minValue={0}
                                value={this.state.dividendYiel}
                                onChange={value => this.setState({ dividendYiel: value })} /></li>
                    </ul>
                    <button type="submit">valider</button>
                </form>

                <ReactTable
                    data={this.state.stocks}
                    columns={this.columns}
                />
                {/* <Table>
                    <TableHead>
                        <TableCell>name</TableCell>
                        <TableCell>dividendRate</TableCell>
                        <TableCell>perRatio</TableCell>
                        <TableCell>symbol</TableCell>
                    </TableHead>
                    {this.state.stocks.map(stock =>
                        <TableRow key={stock.id}>
                            <TableCell>{stock.name} </TableCell>
                            <TableCell>{stock.dividendRate}</TableCell>
                            <TableCell>{stock.perRatio}</TableCell>
                            <TableCell>{stock.symbol}</TableCell>
                        </TableRow>
                    )}
                </Table> */}
            </div>
        );
    }
};

export default Filtres;
