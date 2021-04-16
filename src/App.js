import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "weather-icons/css/weather-icons.css"
import Weather from './components/weatherMain'

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
    this.getWeather()
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  getWeather = async () => {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tofino&appid=${API_key}`)
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
      return response
  };

  render() {
    return (
      <div className="App">
        <Weather city={this.state.city} 
          country={this.state.country}
          celsius= {this.state.celsius}
          tempMax= {this.state.tempMax}
          tempMin= {this.state.tempMin}
          description= {this.state.description}
        />
      </div>
    );
  };
};

export default App;
