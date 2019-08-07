import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import InputRange from 'react-input-range';
import Button from '@material-ui/core/Button';
import Radio from './Radio';
import './filtres.css';


const SearchForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(props);
    const MyRange = props => (
        <InputRange
            maxValue={8}
            minValue={0}
            value={props.input.value}
            onChange={props.input.onChange} />
    )

    return (
        <form onSubmit={handleSubmit} method="POST" action="">
            <h2 className="title-2">SEARCH STOCKS</h2>
            <ul className='filtres'>
                <li className="filtres__li">
                    <h3 className="title-3">PER</h3>
                    <Field
                        className="form-control"
                        name="per"
                        component={Radio}
                        options={{
                            1: '0 < PER < 10',
                            2: '10 < PER < 17 ',
                            3: '17 < PER < 25 ',
                            4: '< 25 '
                        }}
                        labels={{
                            1: '(L action est sous-évaluée ou les bénéfices de la société sont supposés être bientôt en déclin.)',
                            2: '(Pour la majorité des sociétés, un ratio se situant dans cette tranche est considéré comme bon.)',
                            3: '(L action est surévaluée ou il y a croissance des profits depuis les dernières annonces.)',
                            4: 'PER l est probable que de forts profits soient attendus dans le futur, ou l action fait l objet d une bulle spéculative.) '
                        }}
                    />
                </li>
                {/* <li className="filtres__li"><input name="checkBoxEbitdata" id="checkBoxEbitdata" type="checkbox" /><label >EBITDATA Résultat opérationnel </label>
                            <InputRange
                                maxValue={20}
                                minValue={0}
                                value={this.state.ebitdata}
                                onChange={value => this.setState({ ebitdata: value })}
                            /></li> */}
                {/* <li class="filtres__li"><label for="checkBoxLeverage">LEVERAGE (endetement) (Dette/EBITDA)</label>
                            <InputRange
                                maxValue={20}
                                minValue={0}
                                value={this.state.leverage}
                                onChange={value => this.setState({ leverage: value })} /></li> */}
                <li className="filtres__li filtres__li--margT1">
                    <label className="title-3" htmlFor="checkBoxDividend">DIVIDENDS yield ( rendement % )</label>
                    <Field
                        id="dividendYiel"
                        name="dividendYiel"
                        component={MyRange}
                    />
                </li>
            </ul>
            <Button size="large" variant="contained" color="primary" type="submit">valider</Button>
        </form>
    );
};

export default reduxForm({
    form: 'searchForm', // a unique identifier for this form
})(SearchForm);
