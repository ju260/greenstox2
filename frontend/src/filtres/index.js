import './filtres.css';
const React = require('react');

/*const Filtre = require('./filtre');*/


class Filtres extends React.Component {
    
    constructor() {
        super();
    
        this.handleSubmit = this
          .handleSubmit
          .bind(this)
      }
    
      handleSubmit(event) {
        event.preventDefault();
        var data = {
          
        }
       // console.log(data)
       let self = this;
       fetch('http://localhost:3000/search', {
           method: 'GET'
       }).then(function(response) {console.log('response'+response)
           if (response.status >= 400) {
               throw new Error("Bad response from server");
           }
           return response.json();
       }).then(function(data) {
         console.log(data)
          // self.setState({users: data});
       }).catch(err => {
       console.log('caught it!',err);
       })
    
      }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="GET" action="">
                    <h2>SEARCH STOCKS</h2>
                    <ul className='filtres'>
                    {/*<Filtre />*/}
                        <li class="filtres__li">
                            <div><input id="per1" name="per" type="radio" /><label for="per1">0 &lsaquo; PER &lsaquo; 10 <span class="filtres___def">(L'action est sous-évaluée ou les bénéfices de la société sont supposés être bientôt en déclin.)</span></label></div>
                            <div><input id="per2" name="per" type="radio" /><label for="per2">10 &lsaquo; PER &lsaquo; 17 <span class="filtres___def">(Pour la majorité des sociétés, un ratio se situant dans cette tranche est considéré comme bon.)</span></label></div>
                            <div><input id="per3" name="per" type="radio" /><label for="per3">17 &lsaquo; PER &lsaquo; 25 <span class="filtres___def">(L'action est surévaluée ou il y a croissance des profits depuis les dernières annonces.)</span></label></div>
                            <div><input id="per4" name="per" type="radio" /><label for="per4"> 25 &lsaquo; <span class="filtres___def">PER l est probable que de forts profits soient attendus dans le futur, ou l'action fait l'objet d'une bulle spéculative.) </span></label></div></li>
                        <li class="filtres__li"><label>EBITDATA</label><input min="" max="" type="range" name="EBITDATA" /></li>
                        <li class="filtres__li">DIVIDENDS yield<input min="" max="" type="range" name="DIVIDENDS" /></li>
                    </ul>
                    <button type="submit">valider</button>
                </form>
            </div>
        );
    }
};

export default Filtres;
