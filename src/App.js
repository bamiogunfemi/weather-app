import React from "react";
import "./App.css";
import Weather from "./component/weather.component";
import "weather-icons/css/weather-icons.css";
import Form from "./component/form.component";
import "bootstrap/dist/css/bootstrap.min.css";
const API_key = "47103cb3ea13097b7b312566166837ca";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      icon: "",
      main: "",
      temp_celsius: "",
      temp_max: "",
      temp_min: "",
      description: "",
      weatherIcon: "",
      error: false
    };
   

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  

  }
  calCel(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }
  get_WeatherIcon(icon, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: icon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: icon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: icon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: icon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: icon.Atmosphere });
        break;
      case rangeID === 800:
        this.setState({ icon: icon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: icon.Clouds });
        break;
      default:
        this.setState({ icon:icon.Clear});
    }
  }
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country},uk&appid=${API_key}`
    );
    const response = await api_call.json();
    console.log(response)

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      temp_celsius: this.calCel(response.main.temp),
      temp_max: this.calCel(response.main.temp_max),
      temp_min: this.calCel(response.main.temp_min),
      description: response.weather[0].description,
    
    })
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
  }
  else{
    this.setState({error:true})
  }
};
  render(){
    const { ...props } = this.state;
    return (
      <div className="App">
        <h1 className='title text-dark'> Weather App </h1>
        <Form loadWeather={this.getWeather}
         error={this.state.error}/>
        <Weather {...props} />
      </div>
    );
  }
}

export default App;
