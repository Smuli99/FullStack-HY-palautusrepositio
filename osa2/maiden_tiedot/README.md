# Maiden Tiedot

## 2.18* maiden tiedot, step1

```
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

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.cca3}>
          {country.name.common}
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

  useEffect(() => {
    if (value.trim() === '') {
      setCountries([]);
      return;
    }
    
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filteredCountries = response.data.filter(country => 
          country.name.common.toLowerCase().includes(value.toLowerCase())
        );
        setCountries(filteredCountries);
      });
  }, [value]);

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      Find countries: <input value={value} onChange={handleChange} />

      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countries.length > 1 && countries.length <= 10 && (
        <CountryList countries={countries} />
      )}

      {countries.length === 1 && (
        <Country country={countries[0]} />
      )}  
    </div>
  );
};

export default App;
```

## 2.19*: maiden tiedot, step2

```
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
```

## 2.20*: maiden tiedot, step3

```
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

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (!capital) return;
    
    const api_key = import.meta.env.VITE_SOME_KEY;
    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;
    
    axios
      .get(url)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [capital]);

  if (!weather) return <p>Loading weather information...</p>;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Tempature: {weather.main.temp} Celcius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
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
      <Weather capital={country.capital[0]} />
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
```
