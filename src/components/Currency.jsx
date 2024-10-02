import React, { useState } from "react";
import "../style/currency.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

let API_KEY = "YOUR_API_KEY";
let BASE_URL = `https://api.freecurrencyapi.com/v1/latest`;

function Currency() {
  const [amount, setAmount] = useState(0);
  const [fromCurrensy, setFromCurrency] = useState("USD");
  const [toCurrensy, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);

  const exchange = async () => {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrensy}`
    );
    const result = (response.data.data[toCurrensy] * amount).toFixed(2);
    setResult(result);
  };
  return (
    <div className="currency-main">
      <input
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
        placeholder="Enter currency"
        type="number"
        className="amount"
      />

      <select
        onChange={(e) => setFromCurrency(e.target.value)}
        className="from-currency-option"
        defaultValue={fromCurrensy}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="TRY">TRY</option>
      </select>

      <FaArrowRight onClick={exchange} className="right-arrow-icon" />

      <select
        onChange={(e) => setToCurrency(e.target.value)}
        defaultValue={toCurrensy}
        className="to-currency-option"
      >
        <option value="TRY">TRY</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>

      <label type="number" className="result">
        {result}
      </label>
    </div>
  );
}

export default Currency;
