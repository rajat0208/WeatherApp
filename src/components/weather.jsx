import { useEffect, useState } from "react";
import { LuWind } from "react-icons/lu";
import { IoUmbrellaOutline } from "react-icons/io5";
import { FaDroplet } from "react-icons/fa6";
import Search from "./locationSearch";
import FutureWeather from "./futureWeather";
import CurrentWeather from "../services/geoapi";
import WeatherIcon from "./icons";

const Weather = () => {
    const [weatherData, setWeatherData] = useState('')
    const [locationDetail, setLocationDetail] = useState(
        {
            address: "Kathmandu",
            lat: 27.65,
            long: 85.28,
        }
    );
    const [unit, setUnit] = useState("F");
    const handleStateChange = (newState) => {
        setLocationDetail(newState);
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await CurrentWeather(locationDetail.lat, locationDetail.long)
                setWeatherData(result)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [locationDetail])

    const toggleUnit = () => {
        setUnit(unit === "F" ? "C" : "F");
    };

    const toFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };
    const renderTemperature = (temperature) => {
        return unit === "F" ? temperature : toFahrenheit(temperature);
    };
    return (
        <>
            <div className="main-container">
                <div className="weather-container">
                    <div className="weatherInfo">
                        <Search location={locationDetail} updateLocation={handleStateChange} />
                    </div>

                    <h2><span className='primaryText'>Right now in
                        <span className='secondaryText'> {locationDetail.address}, </span>
                        its {weatherData ? weatherData.weatherCondition.weather : ""}.
                    </span></h2>

                    <div className="todays-weather">

                        <div className='todays-weather-image' ><WeatherIcon code={weatherData ? weatherData.weatherCondition.weatherCode : "" } size="230px"/></div>

                        <div className='temp'>
                            <span className='Temp'>{renderTemperature(weatherData.temp)}°</span>
                            <span className='Temp2'>{renderTemperature(weatherData.minTemp)}°/{renderTemperature(weatherData.maxTemp)}°</span>
                        </div>
                        <div className='otherInfo'>
                            <span><LuWind />&nbsp; {weatherData.windSpeed} mph</span>
                            <span><IoUmbrellaOutline />&nbsp;{weatherData.humidity} %</span>
                            <span><FaDroplet />&nbsp; {weatherData.percepitation} %</span>
                        </div>
                    </div>

                    <FutureWeather location={locationDetail} toggleUnit={toggleUnit} />

                    <div className='toggle' onClick={toggleUnit}>
                    <h3 className={unit === "F" ? "active" : ""}>F°</h3>
                        <span>|</span>
                        <h3 className={unit === "C" ? "active" : ""}>C°</h3>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Weather