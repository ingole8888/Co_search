import React, { useState } from 'react';
import axios from 'axios';
import './CurrencySearch.css'; 

const CurrencySearch = () => {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState('');

  const searchCountries = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
      
        setCountries(response.data);
        setNoDataMessage(''); 
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setNoDataMessage('No data found for the specified currency.');
      setCountries([]); 
    }
  };
  

  return (
    <div className="currency-search-container">
      <h1>Country Search by Currency</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Currency Code (e.g., INR)"
          value={currencyCode}
          onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
        />
        <button onClick={searchCountries}>Search</button>
      </div>

      {countries.length > 0 ? (
        <div className="results-container">
          <ul className="countries-grid">
            {countries.map((country) => (
              <li key={country.name.common} className="country-item">
                <img className="country-flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <h3>Name: {country.name.common}</h3>
                <p>Capital: {country.capital[0]}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-data-message">
          {noDataMessage && <p>{noDataMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default CurrencySearch;
