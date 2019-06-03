import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = "d34d0e83ea40705191286d7cc49bac5e";

class App extends React.Component{
  state = {
    city : undefined,
    country : undefined,
    description: undefined,
    temperature : undefined,
    humidity : undefined,
    error : undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);
    if(city && country){
      this.setState({
        city : data.name,
        country : data.sys.country,
        description: data.weather[0].description,
        temperature : data.main.temp,
        humidity : data.main.humidity,
        error : ''
      })
    } else {
      this.setState({
        city : undefined,
        country : undefined,
        description: undefined,
        temperature : undefined,
        humidity : undefined,
        error : 'Please enter the value..'
      })
    }
  }
  render(){
    return(
      <div>
        <div className="wrapper">
          <div className ="main">
           <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
              <Form getWeather = {this.getWeather} />
              <Weather  
                  temperature ={this.state.temperature} 
                  city ={this.state.city} 
                  country ={this.state.country} 
                  weather ={this.state.weather} 
                  humidity ={this.state.humidity} 
                  error ={this.state.error} 
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ) 
  }
}

export default App;
