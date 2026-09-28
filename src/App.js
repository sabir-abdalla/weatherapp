import Header from './components/Header';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import ExtendedForecast from './components/ExtendedForecast';
import axios from 'axios'
import { useEffect, useState } from 'react';
import LeafletMap from "./components/Map"
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastType, setForecastType] = useState("daily")
  const [forecast, setForecast] = useState([])
  const [location, setLocation] = useState('Karachi')
  const [error, setError] = useState('')
  let API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;
  const searchLocation = (event, loc) => {
    setLocation(loc)
  }

  const searchWeather = () => {
    setError("")
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        setData(response.data)
        console.log(response.data.coord)
        const { lon, lat } = response.data.coord;

        axios.get(`https://pro.openweathermap.org/data/2.5/forecast/${forecastType}?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
          .then((response2) => {

            setForecast(response2.data.list)
          })

      }).catch((e) => {
        if (e.response.status == 400) {
          setError("Location not found!")
        } else {
          setError("Error fetching weather data");
        }
      })
  }

  useEffect(() => {
    setError("")
    setLoading(true)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
        const { lon, lat } = response.data.coord;

        axios.get(`https://pro.openweathermap.org/data/2.5/forecast/${forecastType}?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
          .then((response2) => {
            setForecast(response2.data.list)
          })
      }).catch((e) => {
        if (e.response.status == 400) {
          setError("Location not found!")
        } else {
          setError("Error fetching weather data");
        }
      })
    setLoading(false)
  }, [forecastType])
  const onChangeForcastType = (type) => {
    setForecastType(type)
  }
  return (
    <div className='max-w-[1100px] w-full m-auto pb-10'>
      <Header />
      <Search onSetLocation={searchLocation} onSearch={searchWeather} error={error} />
      {data !== null
        && <CurrentWeather data={data} />
      }
      <ExtendedForecast forecast={forecast} handleChange={onChangeForcastType} />
      <div className='container mt-5'>
        {data && (
          <LeafletMap
            loading={!loading}
            position={[data?.coord?.lat || 0, data?.coord?.lon || 0]}
            zoom={6}
            city={data?.name}
          />
        )}
      </div>
    </div>
  );
}

export default App;
