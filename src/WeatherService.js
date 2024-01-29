const API = {
  KEY: 'f1bbbfa5b0acebe0bc420772e7b0e7fb',
  BASE: 'https://api.openweathermap.org',
  ICONS: 'https://openweathermap.org/img/wn',
  // SETTINGS: {
  //   TEMP_UNITS: 'metric', //Fahrenheit - units=imperial, Celsius - units=metric, Kelvin - 3default
  //   TEMP_SYMBOL: '°C', //Fahrenheit - °F
  // },
};

const makeIconURL = (iconId) => `${API.ICONS}/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units) => {
  const URL = `${API.BASE}/data/2.5/weather?q=${city}&units=${units}&APPID=${API.KEY}`;
  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp: temp.toFixed(),
    feelsLike: feels_like.toFixed(),
    humidity,
    windSpeed: speed.toFixed(),
    city: name,
    country,
  };
};

export { getFormattedWeatherData };
