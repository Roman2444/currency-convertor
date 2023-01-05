import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
const [fromCurrency, setFromCurrency] = React.useState('RUB');
const [toCurrency, setToCurrency] = React.useState('USD');
const [fromPrice, setFromPrice] = React.useState(0);
const [toPrice, setToPrice] = React.useState(0);

const [rates, setRates] = React.useState({RUB:{Value:1}});

const onChangeFromPrice = (value) => {
  const price = value / rates[fromCurrency]['Value'];
  console.log('----*-',fromCurrency);
  const result = price * rates[toCurrency]['Value'];
  setFromPrice(value);
  setToPrice(result);

}

const onChangeToPrice = (value) => {
  setToPrice(value);
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
