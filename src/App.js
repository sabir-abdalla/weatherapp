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
  const [forecast, setForecast] = useState([])
  const [timezone, setTimezone] = useState(0)
  const [location, setLocation] = useState('Karachi')
  const [error, setError] = useState('')
  let API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;
  const searchLocation = (event, loc) => {
    setLocation(loc)
  }

  // Free endpoint: 5 days of forecast in 3-hour steps
  const fetchForecast = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        setForecast(response.data.list)
        setTimezone(response.data.city?.timezone || 0)
      })
      .catch(() => {
        setForecast([])
      })
  }

  const getWeather = () => {
    setError("")
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        setData(response.data)
        const { lon, lat } = response.data.coord;
        fetchForecast(lat, lon)
      }).catch((e) => {
        if (e.response?.status === 400 || e.response?.status === 404) {
          setError("Location not found!")
        } else {
          setError("Error fetching weather data");
        }
      })
  }

  const searchWeather = () => {
    getWeather()
  }

  useEffect(() => {
    setLoading(true)
    getWeather()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='max-w-[1100px] w-full m-auto pb-10'>
      <Header />
      <Search onSetLocation={searchLocation} onSearch={searchWeather} error={error} />
      {data !== null
        && <CurrentWeather data={data} />
      }
      <ExtendedForecast forecast={forecast} timezone={timezone} />
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
