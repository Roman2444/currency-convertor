import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
const [rates, setRates] = React.useState({});

React.useEffect(() => {

  var myHeaders = new Headers();
  myHeaders.append("apikey", "5rnWmZNgbGFETcx5BJHMIubs5dvQui4w");
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  fetch("https://api.apilayer.com/fixer/latest?symbols=RUB&base=EUR", requestOptions)
    .then(response => response.json())
    .then(response => setRates(response.rates))
    .catch(error => console.log('error', error));

}, []);

console.log('**>', rates)

  return (
    <div className="App">
      <Block value={0} currency="RUB" onChangeCurrency={(cur) => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  );
}

export default App;
