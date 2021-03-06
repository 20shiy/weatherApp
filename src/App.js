
import './App.css';
import React, { useState } from 'react'
import {fetchWeather} from './component/weather'

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = async(e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query)
      setWeather(data)
      setQuery('')
    }
  }
  

  return (
    <div className="App">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      {weather.main && (
        <div>
          <h2>
            {weather.name},
            {weather.sys.country}
            
          </h2>
          <p>
          {weather.main.temp}&deg;C
          </p>
        </div>
      )
      }
      
    </div>
  );
}

export default App;
