import { useState, useEffect } from 'react';
import axios from 'axios';

const Info = ({ name, capital, area }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
    </div>
  );
};

const Flag = ({ alt, png }) => {
  return (
    <div>
      <img src={png} alt={alt} style={{border: '2px solid black'}}/>
    </div>
  );
};

const CountryList = ({ countries, selectedCountry }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => selectedCountry(country)}>Show</button>
        </div>
      )}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <Info 
        name={country.name.common} 
        capital={country.capital[0]}
        area={country.area}
      />
      <Languages languages={country.languages} />
      <Flag alt={country.flags.alt} png={country.flags.png} />
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (value.trim() === '') {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }
    
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filteredCountries = response.data.filter(country => 
          country.name.common.toLowerCase().includes(value.toLowerCase())
        );
        setCountries(filteredCountries);
        if (filteredCountries.length === 1) setSelectedCountry(null);
      });
  }, [value]);

  const selectedCountryHandler = (countryObject) => {
    setSelectedCountry(countryObject);
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      Find countries: <input value={value} onChange={handleChange} />

      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countries.length > 1 && countries.length <= 10 && (
        <CountryList countries={countries} selectedCountry={selectedCountryHandler} />
      )}

      {countries.length === 1 && !selectedCountry && (
        <Country country={countries[0]} />
      )}

      {selectedCountry && (
        <Country country={selectedCountry} />
      )}
    </div>
  );
};

export default App;