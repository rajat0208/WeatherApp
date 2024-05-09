import { useState } from 'react';
import Sun from '../assets/sun.png';
import CloudySun from '../assets/cloudySun.png';
import Rainy from '../assets/raining.png';
import Cloudy from '../assets/cloudy.png';
import Thunderrain from '../assets/thunderRain.png';
import Thunder from '../assets/thunder.png';
import Snowy from '../assets/snowy.png';
import Sunrain from '../assets/sunrain.png';
import "../App.css"

const WeatherIcon = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const iconSize = {
        width: props.size,
        height: props.size,
    };

    switch (props.code) {
        case 1:
            return <img src={Sun} alt="Sun" style={iconSize} />;

        case 2:
            return <img src={CloudySun} alt="Cloudy Sun" style={iconSize} />;

        case 3:
            return <img src={Cloudy} alt="Cloudy" style={iconSize} />;

        case 4:
            return <img src={Rainy} alt="Rainy" style={iconSize} />;

        case 5:
            return <img src={Thunderrain} alt="Thunder Rain" style={iconSize} />;

        case 6:
            return <img src={Thunder} alt="Thunder" style={iconSize} />;

        case 7:
            return <img src={Sunrain} alt="Sun Rain" style={iconSize} />;

        case 8:
            return <img src={Snowy} alt="Snowy" style={iconSize} />;
            
        default:
            <div className="loading-spinner" style={iconSize}></div>
    }
}

export default WeatherIcon;
