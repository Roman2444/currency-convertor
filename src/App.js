import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
const [fromCurrency, setFromCurrency] = React.useState('RUB');
const [toCurrency, setToCurrency] = React.useState('USD');
const [fromPrice, setFromPrice] = React.useState(0);
const [toPrice, setToPrice] = React.useState(0);

const [rates, setRates] = React.useState({RUB:{Value:1}});

const onChangeFromPrice = (value, currency=fromCurrency) => {
  const result = value * rates[currency]['Value'] / rates[toCurrency]['Value'];
  setFromPrice(value);
  setToPrice(result.toFixed(3));
}

const onChangeToPrice = (value, currency=toCurrency) => {
  const result = value / rates[fromCurrency]['Value'] * rates[currency]['Value'];
  setToPrice(value);
  setFromPrice(result.toFixed(3));
}

const getCourses = () => {
  
  fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(response => response.json())
    .then(response => setRates({...rates, ...response.Valute}))
    .catch(error => {
      console.log('error', error);
      alert('Ошибка получения данных')
    });
}

React.useEffect(() => {
  getCourses();
}, []);

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
