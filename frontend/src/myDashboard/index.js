const React = require('react');

class MyDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.handleFilterTextChange = this
            .handleFilterTextChange
            .bind(this);

        this.getInfosMarkets = this
            .getInfosMarkets
            .bind(this);

      
    }

    componentDidMount() {
        this.getInfosMarkets();
    }

    getInfosMarkets(symbol) {

        const alpha = require('alphavantage')({key: 'JUX3JBVEJOUXOOJ6'});
        console.log(this.symbol);
        // Simple examples
        alpha
            .data
            .monthly(this.symbol)
            .then(data => {
                console.log(data);
            });

        /*alpha
            .data
            .batch([this.symbol])
            .then(data => {
                console.log(data);
            });*/
/*fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=VK&types=chart&range=1m&last=5')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });*/

            
    }

    handleFilterTextChange(e) {
        this.symbol = e.target.value;
        console.log(this.symbol);
    }

    render() {
        return (
            <section className="section" id="">
                <input
                    type="text"
                    placeholder="symbol market x. FB"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}/>
                <button onClick={this.getInfosMarkets}>report</button>
            </section>
        );
    }
};

module.exports = MyDashboard;
