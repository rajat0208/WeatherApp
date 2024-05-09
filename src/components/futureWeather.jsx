import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { ForecastData } from "../services/geoapi";
import WeatherIcon from "./icons";
import "../App.css";

const FutureWeather = (props) => {
    const [forecastDetail, setForecastDetail] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await ForecastData(props.location.lat, props.location.long)
                setForecastDetail(result)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [props.location])

    return (
        <>

            <div className='future-weather'>
                {forecastDetail && forecastDetail.map((daily, index) => (
                    daily.day === "today" ? <></> :
                        <div key={index} className=" future-weather-item">
                            <WeatherIcon code={daily.weather_code.weatherCode} size="50px" />
                            <span className='day'>
                                {daily.day === 'tomorrow' ? 'TOM' : daily.day} 
                            </span>
                            <span className="weather-type">
                            {daily.weather_code.weather}
                            </span>
                            <div className='future-temp'> {daily.temperature_2m_min}° / {daily.temperature_2m_max}°</div>
                        </div>
                ))}
            </div>
            
        </>
    )
}

export default FutureWeather;