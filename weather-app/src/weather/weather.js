import React from "react";
import './weather.css'
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MapApp from "../map/map";

const API_key = "e1a07608d561aa24c968127b7a881662"

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            celsius: undefined,
            temp_min: undefined,
            temp_max: undefined,
            description: "",
            error: false,
            showButton: false,
            disabled: false,
            lat: 0,
            lon: 0
        }

        this.weatherIcon = {
            Thunderstorm: 'wi-thunderstorm',
            Drizzle: 'wi-sleet',
            Rain: 'wi-storm-showers',
            Snow: 'wi-day-snow',
            Atmosphere: 'wi-fog',
            Clear: 'wi-day-sunny',
            Clouds: 'wi-day-fog',
        }
    }

    calculateCelsius(temp) {
        return Math.floor(temp - 273.15);
    }

    setMyState(lat = 0, lon = 0, city = undefined, country = undefined, celsius = undefined, temp_min = undefined, temp_max = undefined, description = undefined, error = true, showButton = false, icon = undefined) {
        this.setState({
            lat: lat,
            lon: lon,
            city: city,
            country: country,
            celsius: celsius,
            temp_min: temp_min,
            temp_max: temp_max,
            description: description,
            error: error,
            showButton: showButton,
            icon: icon,
        })
    }

    getWeatherIcon(rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({icon: this.weatherIcon.Rain});
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeId >= 700 && rangeId <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeId === 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icon: this.weatherIcon.Clouds});
                break;
            default:
                this.setState({icon: this.weatherIcon.Clear})
        }
    }

    fetchApi = (city, country) => {
        if (city && country) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
                .then(response => response.json())
                .then(data => {
                    this.setMyState(data.coord.lat, data.coord.lon, data.name, data.sys.country, this.calculateCelsius(data.main.temp), this.calculateCelsius(data.main.temp_min), this.calculateCelsius(data.main.temp_max), data.weather[0].description, false, true)
                    this.getWeatherIcon(data.weather[0].id)
                    console.log(data)
                })
                .catch(() => {
                    this.setMyState();
                })
        } else {
            this.setMyState();
        }
    }

    disableButton() {
        this.setState({disabled: true})
        setTimeout(() => {
            this.setState({disabled: false})
        }, 3000);
    }

    getWeather = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value

        this.fetchApi(city, country)
        this.disableButton();
    }

    refreshWeather = (city, country) => {
        this.fetchApi(city, country)
        this.disableButton();
    }

    render() {
        return (
            <div className='App' style={{backgroundImage: this.props.url}}>
                <Form loadWeather={this.getWeather} error={this.state.error}/>
                <Weather city={this.state.city}
                         country={this.state.country}
                         temp_celcius={this.state.celsius}
                         temp_max={this.state.temp_max}
                         temp_min={this.state.temp_min}
                         description={this.state.description}
                         weatherIcon={this.state.icon}
                         showButton={this.state.showButton}
                         refreshWeather={this.refreshWeather}
                         disabled={this.state.disabled}
                         lat={this.state.lat}
                         lon={this.state.lon}/>
            </div>
        )
    }
}

const Weather = (props) => {
    const showTemp = (temp, min, max) => {
        if (temp != null)
            return (
                <div>
                    <h1 className='py-2'>{temp}&deg;</h1>
                    <h1>
                        <span className='px-4'>{min}&deg;</span>
                        <span className='px-4'>{max}&deg;</span>
                    </h1>
                </div>
            )
    }

    const showButton = () => {
        return (
            <div>
                {props.disabled ?
                    <button className="btn btn-warning refresh" onClick={() => {
                        props.refreshWeather(props.city, props.country)
                    }} disabled>Refresh</button> :
                    <button className="btn btn-warning refresh" onClick={() => {
                        props.refreshWeather(props.city, props.country)
                    }}>Refresh</button>}
            </div>
        )
    }

    return (
        <div className='container text-light'>
            <div className='cards py-4'>
                <h1>{props.city} {props.country}</h1>

                <h5 className='py-2'>
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                </h5>

                {showTemp(props.temp_celcius, props.temp_min, props.temp_max)}

                <h4 className='py-3'>{props.description}</h4>
                <div>
                    {props.showButton ? showButton() : null}
                </div>
            </div>
                {props.lon !== 0 && <MapApp lon={props.lon} lat={props.lat}/>}
        </div>
    )
}

const Form = props => {
    const error = () => {
        return (
            <div className="alert alert-warning mx-5" role="alert">
                Error!
            </div>
        )
    }

    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadWeather}>
                <div className="row justify-content-center">
                    <div className="col-3">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City"/>
                    </div>
                    <div className="col-3">
                        <input type="text" className="form-control" name="country" autoComplete="off"
                               placeholder="Country"/>
                    </div>
                </div>
                <div className="py-4">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </form>
        </div>
    )
}

