import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
const [fromCurrency, setFromCurrency] = React.useState('RUB');
const [toCurrency, setToCurrency] = React.useState('USD');
const [fromPrice, setFromPrice] = React.useState(0);
const [toPrice, setToPrice] = React.useState(0);

const [rates, setRates] = React.useState({});

const onChangeFromPrice = (value) => {
  setFromPrice(value);
}

const onChangeToPrice = (value) => {
  setToPrice(value);
}

const getCourses = () => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "5rnWmZNgbGFETcx5BJHMIubs5dvQui4w");
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  fetch("https://api.apilayer.com/currency_data/live?source=USD&currencies=EUR%2CRUB%2CGBP%2CUSD", requestOptions)
  .then(response => response.json())
    .then(response => setRates(response.quotes))
    .catch(error => {
      console.log('error', error);
      alert('Ошибка получения данных')
    });
}

React.useEffect(() => {
  getCourses();
}, []);

console.log('**>', rates);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}/>
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
