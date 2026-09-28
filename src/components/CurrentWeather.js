import React, { useState, useEffect } from 'react'
import TopArrow from "../assets/top.svg"
import BottomArrow from "../assets/bottom.svg"
import Humidity from "../assets/Humidity.svg"
import Wind from "../assets/wind.svg"
import Pressure from "../assets/pressure.svg"
import { MdVisibility } from "react-icons/md";
import RainDay from "../assets/weather/rain.png"
import RainNight from "../assets/weather/rainy-night.png"
import Sun from "../assets/weather/sun.png"
import Moon from "../assets/weather/moon.png"
import DirzzleDay from "../assets/weather/drizzle.png"
import DirzzleNight from "../assets/weather/drizzle-night.png"
import SnowDay from "../assets/weather/snow-day.png"
import SnowNight from "../assets/weather/snow-night.png"
import { format, getDate, getDay } from 'date-fns';

const CurrentWeather = (data) => {
    let iconCode = data?.data?.weather[0].icon;
    let weatherIcon;
    switch (iconCode) {
        case "01d":
            weatherIcon = <img src={Sun} alt="Clear Sky" className="w-28 h-28" />;
            break;
        case "01n":
            weatherIcon = <img src={Moon} alt="Clear Sky" className="w-28 h-28" />;
            break;
        case "02d":
            weatherIcon = <img src={Sun} alt="Clear Sky" className="w-28 h-28" />;
            break;
        case "02n":
            weatherIcon = <img src={Moon} alt="Clear Sky" className="w-28 h-28" />;
            break;
        case "03d":
            weatherIcon = <img src={DirzzleDay} alt="DirzzleDaySky" className="w-28 h-28" />;
            break;
        case "03n":
            weatherIcon = <img src={DirzzleNight} alt="DirzzleDaySky" className="w-28 h-28" />;
            break;
        case "04d":
            weatherIcon = <img src={DirzzleDay} alt="DirzzleDaySky" className="w-28 h-28" />;
            break;
        case "04n":
            weatherIcon = <img src={DirzzleNight} alt="DirzzleDaySky" className="w-28 h-28" />;
            break;
        case "09d":
            weatherIcon = <img src={RainDay} alt="RainDay" className="w-28 h-28" />;
            break;
        case "09n":
            weatherIcon = <img src={RainNight} alt="RainDay" className="w-28 h-28" />;
            break;
        case "10d":
            weatherIcon = <img src={RainDay} alt="RainDay" className="w-28 h-28" />;
            break;
        case "10n":
            weatherIcon = <img src={RainNight} alt="RainDay" className="w-28 h-28" />;
            break;
        case "13d":
            weatherIcon = <img src={SnowDay} alt="SnowDay" className="w-28 h-28" />;
            break;
        case "13n":
            weatherIcon = <img src={SnowNight} alt="SnowDay" className="w-28 h-28" />;
            break;
        default:
            weatherIcon = <img src={Sun} alt="Clear Sky" className="w-28 h-28" />;
            break;
    }






    const utc_seconds = parseInt(data.data.dt, 10) + parseInt(data.data.timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds).toUTCString();
    const currentDate = local_date;

    const dateObject = new Date(currentDate);
    
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
  
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const time = `${formattedHours}:${formattedMinutes}`;
  
    const monthName = format(currentDate, 'MMMM');
  
    const dateOfMonth = getDate(currentDate);
    const dayOfWeek = getDay(currentDate);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayName = dayNames[dayOfWeek];

  
    return (
        <div className='bg-light_white rounded-xl py-8 px-5 md:px-10 flex flex-col gap-4' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 3px" }}>
            <h6 className='text-blue_400 text-lg font-medium'>Current Weather</h6>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-[50%] flex flex-col py-4 md:px-6'>
                    <h4 className='text-blue_800 font-medium text-3xl mb-4'>{data?.data?.name}</h4>
                    <div className='mb-8'>
                        <div className='flex items-end text-light_blue gap-2'>
                            <span className='text-5xl font-extralight'>
                                {time}
                            </span>
                        </div>
                        <div className='flex items-center text-lg text-blue_700 mt-1'>
                            <span className='mr-2'>{dayName}</span>
                            <span className='mr-2'>{dateOfMonth}</span>
                            <span>{monthName}</span>
                        </div>
                    </div>
                    <div className='flex '>
                        {weatherIcon}
                        <span className='font-extralight text-[80px] md:text-[112px] ml-6 text-blue_800'>{data?.data?.main?.temp.toFixed(0)}<sup>°</sup></span>
                    </div>
                    <h6 className='text-xl text-light_blue font-semibold capitalize'>{
                        data?.data?.weather[0]?.description
                    }</h6>


                </div>

                <div className='w-full md:w-[50%] py-4 md:px-6'>
                    <div className="">
                        <p className="text-blue_700 text-xl">Feels like {data?.data?.main?.feels_like}<sup>°</sup></p>
                        <div className="flex items-center gap-10 mt-5 mb-10">
                            <div className="flex items-center gap-4">
                                <img src={TopArrow} alt="Top Arrow" />
                                <span className='font-medium text-xl text-blue_800'> {data?.data?.main?.temp_max}<sup>°</sup></span>
                            </div>
                            <div className="flex items-center gap-4">
                                <img src={BottomArrow} alt="bottom Arrow" />
                                <span className='font-medium text-xl text-blue_800'>{data?.data?.main?.temp_min}<sup>°</sup></span>
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className='flex items-center gap-4 w-32'>
                                <img src={Humidity} alt="Humidity" />
                                <span className='text-blue_700 text-base'>Humidity</span>
                            </div>
                            <span className='text-lg font-medium text-blue_800'>{data?.data?.main?.humidity}%</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className='flex items-center gap-4 w-32'>
                                <img src={Wind} alt="Wind" />
                                <span className='text-blue_700 text-base'>Wind</span>
                            </div>
                            <span className='text-lg font-medium text-blue_800'>{data?.data?.wind?.speed}kph</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className='flex items-center gap-4 w-32'>
                                <img src={Pressure} alt="Pressure" />
                                <span className='text-blue_700 text-base'>Pressure</span>
                            </div>
                            <span className='text-lg font-medium text-blue_800'>{data?.data?.main?.pressure}hPa</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className='flex items-center gap-4 w-32'>
                                <MdVisibility className='text-dark_text text-xl' />
                                <span className='text-blue_700 text-base'>Visibility</span>
                            </div>
                            <span className='text-lg font-medium text-blue_800'>{data?.data?.visibility / 1000} km</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather