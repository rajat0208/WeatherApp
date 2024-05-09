import axios from "axios";

export default function CurrentWeather(lat, long) {
    return axios.get(
        "https://api.open-meteo.com/v1/forecast?&daily=apparent_temperature_max,apparent_temperature_min&hourly=relativehumidity_2m,temperature_2m,weathercode,windspeed_10m,precipitation_probability&timeformat=unixtime&forecast_days=1&timezone=auto",
        {
            params: {
                latitude: lat,
                longitude: long,
            }
        }
    )
        .then(({ data }) => {
            console.log(data);
            const currentTime = getCurrentTime(Date(), data.timezone);
            return getCurrentWeather(data, currentTime.currentHour);
        }
        )
}

function getCurrentTime(date, timezone) {
    const time = new Date(date).toLocaleTimeString('en-US', { timeZone: timezone }).split(" ");
    const splitTime = time[0].split(":");
    const currenthour = Number(splitTime[0]);
    let currenthour24 = 0;
    if (time[1] === "AM") currenthour24 = currenthour % 12;
    else
        if (currenthour < 12) currenthour24 = 12 + currenthour;
        else currenthour24 = currenthour;

    return ({
        currentHour: currenthour24,
        currentTime: splitTime[0] + ":" + splitTime[1] + " " + time[1]
    });

}

function getCurrentWeather({ daily, hourly }, currentTime) {
    return {
        temp: Math.round(hourly.temperature_2m[currentTime]),
        weatherCode: hourly.weathercode[currentTime],
        weatherCondition: mapWeatherCode(hourly.weathercode[currentTime]),
        humidity: Math.round(hourly.relativehumidity_2m[currentTime]),
        windSpeed: Math.round(hourly.windspeed_10m[currentTime]),
        precipitation: Math.round(hourly.precipitation_probability[currentTime]),
        maxTemp: Math.round(daily.apparent_temperature_max[0]),
        minTemp: Math.round(daily.apparent_temperature_min[0]),
    };
}

export function mapWeatherCode(weathercode) {
    if (weathercode <= 1) return { weatherCode: 1, weather: "clear" };
    else if (weathercode < 3) return { weatherCode: 2, weather: "partly cloudy" };
    else if (weathercode < 50) return { weatherCode: 3, weather: "fog/cloudy" };
    else if (weathercode < 60) return { weatherCode: 7, weather: "drizzle" };
    else if (weathercode < 70) return { weatherCode: 4, weather: "rainy" };
    else if (weathercode < 80) return { weatherCode: 8, weather: "snow" };
    else if (weathercode < 95) return { weatherCode: 5, weather: "rain shower" };
    else return { weatherCode: 6, weather: "Thuderstorm" };

}


export function ForecastData(lat, lon) {
    return axios.get(
         "https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5",
        {
            params: {
                latitude: lat,
                longitude: lon,
            },
        }
    )
        .then(({ data }) => {
            return getForeCastData(data);
        }
        )
}
function getForeCastData({ daily }) {


    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily;

    const extractedData = time.map((currentTime, index) => ({
        day: dateToDay(currentTime),
        weather_code: mapWeatherCode(weather_code[index]),
        temperature_2m_max: Math.round(temperature_2m_max[index]),
        temperature_2m_min: Math.round(temperature_2m_min[index])
    }));
    return (extractedData)

}

function dateToDay(dateString) {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'short' });

    if (date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()) {
        return 'today';
    } else if (date.getDate() === tomorrow.getDate() &&
               date.getMonth() === tomorrow.getMonth() &&
               date.getFullYear() === tomorrow.getFullYear()) {
        return 'tomorrow';
    } else {
        return dayOfWeek;
    }
}