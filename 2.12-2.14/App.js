import { useState, useEffect } from "react"
import axios from "axios"

const FindCountries = ({ toFilter, onChange}) => {
  return (
    <div>
      Find Countries: <input value={toFilter} onChange={onChange} />
    </div>
  )
}

const DisplayCountry = ({country , api_key, countryState, setCountryState}) => {

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${api_key}`)
    .then(res => {
      console.log(res.data.weather[0].icon)
      setCountryState([
        res.data.main.temp - 273.15,
        res.data.wind.speed,
        'https://openweathermap.org/img/wn/' + res.data.weather[0].icon + '@2x.png'
      ])
    })
  },[])
  let flag = country.flags.png
  let lanArray = []
  for (let o in country.languages) {
    lanArray.push(country.languages[o])
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
      {lanArray.map(x => <li>{x}</li>)}
      </ul>
      <img src={flag} alt='Flag'/>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature: {countryState[0]}</p>
      <img src={countryState[2]} alt=''/>
      <p>wind: {countryState[1]}</p>
    </div>
  )
}

const Countries = ({appData, toFilter, setToFilter, api_key, countryState, setCountryState}) => {
  let filtered = appData.filter(country => country.name.common.toLowerCase().includes(toFilter.toLowerCase()))
  if (filtered.length > 10) {
    return (
      <div>
        <p>To many matches, specify another filter</p>
      </div>
    )
  } else if (filtered.length === 1) {
    return (
      <div>
        <DisplayCountry country={filtered[0]} api_key={api_key} countryState={countryState} setCountryState={setCountryState}/>
      </div>
    )
  }
  return (
    <div>
      {filtered.map(x => <p>{x.name.common}: <button onClick={() => setToFilter(x.name.common)}>show</button></p>)}
    </div>
  )
}



const App = () => {
  const [appData, setAppData] = useState([])
  const [toFilter, setToFilter] = useState('')
  const [countryState, setCountryState] = useState(['na', 'na', 'https://imgs.search.brave.com/aHslxJo2ZbTjn4dr_Aht29FTr-i5F5PxNlPTLYO6Fw8/rs:fit:180:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5D/T0JkYVZLMGJKQWdP/cXhkM3VhcWt3QUFB/QSZwaWQ9QXBp'])
  const api_key = process.env.REACT_APP_API_KEY
  const handleToFilterChange = (event) => {
    setToFilter(event.target.value)
  }

  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => {
      setAppData(res.data)
    })
  },[])

  return (
    <div>
      <h1>Country Finder</h1>
      <FindCountries toFilter={toFilter} onChange={handleToFilterChange}/>
      <Countries appData={appData} toFilter={toFilter} setToFilter={setToFilter} api_key={api_key} countryState={countryState} setCountryState={setCountryState}/>
    </div>
  )
}
export default App
