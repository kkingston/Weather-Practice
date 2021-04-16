import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "weather-icons/css/weather-icons.css"
import Weather from './components/weatherMain'
import Form from './components/Form'

const API_key= '9c96e135f012980c60e88455c2a55a76'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempMax: undefined,
      tempMin: undefined,
      description: '',
      error: false

    }

    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Foggy: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'

    }
  };

  getWeatherIcon(icons, rangeID) {
    switch(true) {
      case rangeID >= 200 && rangeID <=232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeID >= 300 && rangeID <=321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case rangeID >= 500 && rangeID <=531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case rangeID >= 600 && rangeID <=622:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case rangeID >= 700 && rangeID <=781:
        this.setState({icon: this.weatherIcon.Foggy})
        break;
      case rangeID === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;
      case rangeID >= 801 && rangeID <=804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;
      default:
        this.setState({icon: this.weatherIcon.Clear})
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  getWeather = async (e) => {
      e.preventDefault()
      const city = e.target.elements.city.value
      const country = e.target.elements.country.value

      if(city&&country) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
      const response = await api_call.json();
      console.log(response)
      
      this.setState({
        city: response.name,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        tempMax: this.calCelsius(response.main.temp_max),
        tempMin: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
      })

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
      return response
    } else {
      this.setState({error : true})
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather city={this.state.city} 
          country={this.state.country}
          celsius= {this.state.celsius}
          tempMax= {this.state.tempMax}
          tempMin= {this.state.tempMin}
          description= {this.state.description}
          weatherIcon= {this.state.icon}
        />
      </div>
    );
  };
};

export default App;
