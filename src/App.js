import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import "weather-icons/css/weather-icons.css"
import Weather from './components/weatherMain'

//api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key= '9c96e135f012980c60e88455c2a55a76'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.getWeather()
  };

  getWeather = async () => {
    // const settings = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // }
    try {
      const api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`)
      const response = await api_call.json();
      console.log(response)
    } catch(e) {
      console.log('error', e)
    }
  };

  render() {
    return (
      <div className="App">
        <Weather/>
      </div>
    );
  };
};

export default App;
