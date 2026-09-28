import Sun from "../assets/weather/sun.png";
import Moon from "../assets/weather/moon.png";
import DirzzleDay from "../assets/weather/drizzle.png";
import DirzzleNight from "../assets/weather/drizzle-night.png";
import RainDay from "../assets/weather/rain.png";
import RainNight from "../assets/weather/rainy-night.png";
import SnowDay from "../assets/weather/snow-day.png";
import SnowNight from "../assets/weather/snow-night.png";

export const weatherIcon = {
    "01d": <img src={Sun} alt="Clear Sky" className="w-14 h-14 my-3" />,
    "01n": <img src={Moon} alt="Clear Sky" className="w-14 h-14 my-3" />,
    "02d": <img src={Sun} alt="Clear Sky" className="w-14 h-14 my-3" />,
    "02n": <img src={Moon} alt="Clear Sky" className="w-14 h-14 my-3" />,
    "03d": <img src={DirzzleDay} alt="DirzzleDaySky" className="w-14 h-14 my-3" />,
    "03n": <img src={DirzzleNight} alt="DirzzleDaySky" className="w-14 h-14 my-3" />,
    "04d": <img src={DirzzleDay} alt="DirzzleDaySky" className="w-14 h-14 my-3" />,
    "04n": <img src={DirzzleNight} alt="DirzzleDaySky" className="w-14 h-14 my-3" />,
    "09d": <img src={RainDay} alt="RainDay" className="w-14 h-14 my-3" />,
    "09n": <img src={RainNight} alt="RainDay" className="w-14 h-14 my-3" />,
    "10d": <img src={RainDay} alt="RainDay" className="w-14 h-14 my-3" />,
    "10n": <img src={RainNight} alt="RainDay" className="w-14 h-14 my-3" />,
    "13d": <img src={SnowDay} alt="SnowDay" className="w-14 h-14 my-3" />,
    "13n": <img src={SnowNight} alt="SnowDay" className="w-14 h-14 my-3" />,
    default: <img src={Sun} alt="Clear Sky" className="w-14 h-14 my-3" />
};
