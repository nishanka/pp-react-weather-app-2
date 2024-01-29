import React, { useEffect, useState } from 'react';
import './App.css';
import { getFormattedWeatherData } from './WeatherService';
import BlockContainer from './components/UI/BlockContainer';

function App() {
  const [city, setCity] = useState('sydney');
  const [data, setData] = useState({});
  const [units, setUnits] = useState('metric'); // °C - metric, °F - imperial
  const [bg, setBg] = useState('normal');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setData(data);

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) {
        setBg('cold');
      } else {
        setBg('hot');
      }
    };
    fetchData();
  }, [units, city]);

  let containerClass = 'container';
  if (data.city === '' || data.city === undefined) {
    containerClass = 'container initial';
  }

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const handleEnterKeydown = (event) => {
    if (event.keyCode === 13) {
      if (event.currentTarget.value.length > 0) {
        setCity(event.currentTarget.value);
        event.currentTarget.blur();
      } else {
        setError('City is empty!');
      }
    }
  };

  return (
    <div className={`app ${bg}`}>
      <div className={containerClass}>
        <BlockContainer className='top'>
          <div className='search'>
            <input
              onKeyDown={handleEnterKeydown}
              placeholder='Enter City...'
              type='text'
              name='city'
            />
          </div>
          {data.city !== '' && data.city !== undefined && (
            <button className='unit' onClick={handleUnitsClick}>
              °{units === 'metric' ? 'F' : 'C'}
            </button>
          )}
          {error && (
            <div className='error'>
              <p>{error}</p>
            </div>
          )}
        </BlockContainer>

        {data.city !== '' && data.city !== undefined && (
          <>
            <BlockContainer className='middle'>
              <div className='location'>
                <h3>
                  <span></span>
                  {data.city}, {data.country}
                </h3>
              </div>
              <div className='image'>
                <img src={data.iconURL} alt={data.description} />
              </div>
              <div className='temp'>
                {data.temp ? (
                  <h1>
                    <span className='temp-value'>{data.temp}</span>°
                    {units === 'metric' ? 'C' : 'F'}
                  </h1>
                ) : null}
              </div>
              <div className='description'>
                {data.description ? <p>{data.description}</p> : null}
              </div>
            </BlockContainer>

            <BlockContainer className='bottom'>
              <div className='feels'>
                {data.feelsLike ? (
                  <p>
                    {data.feelsLike}°{units === 'metric' ? 'C' : 'F'}
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {data.humidity ? <p>{data.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.windSpeed ? <p>{data.windSpeed} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </BlockContainer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
