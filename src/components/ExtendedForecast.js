import React, { useState } from 'react'
import { weatherIcon } from './WeatherIcons.js'; // Import icons


const ExtendedForecast = ({ forecast, handleChange }) => {
    const [forecastView, setForecastView] = useState('daily');

    const toggleForecastView = () => {
        const newView = forecastView === 'daily' ? 'hourly' : 'daily';
        handleChange(newView);
        setForecastView(newView)
    };

    const today = new Date();

    // Array to store the next 7 days
    const next7Days = [];

    // Calculate and store the dates for the next 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        next7Days.push(date);
    }

    return (
        <div className='bg-light_white rounded-xl py-8 px-5 md:px-10 flex flex-col gap-4 mt-4' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 3px" }}>
            <div className='flex justify-between items-center gap-2'>
                <h6 className='text-blue_400 text-lg font-medium'>Extended Forecast</h6>
                <div className='flex bg-blue_bg rounded-sm'>
                    <button className={`w-16 text-sm p-1 ${forecastView === 'daily' ? 'bg-blue_800 text-white' : 'bg-transparent text-blue_700'}`} onClick={toggleForecastView}>Daily</button>
                    <button className={`w-16 text-sm  p-1 ${forecastView === 'hourly' ? 'bg-blue_800 text-white' : 'bg-transparent text-blue_700'}`} onClick={toggleForecastView}>Hourly</button>
                </div>
            </div>

            {forecastView === 'daily' ? (
                // Daily 
                <div className='flex overflow-x-auto justify-between gap-3 mt-4 forecast'>
                    {forecast.map((v, i) => {
                        const icon = weatherIcon[v.weather[0].icon] || weatherIcon.default;

                        const forecastDate = new Date(today);
                        forecastDate.setDate(today.getDate() + i);

                        return <div className='flex flex-col items-center justify-center py-2 min-w-32 px-2 rounded bg-blue_bg cursor-pointer' key={i}>
                            <h6 className='text-blue_700 tex-xl font-semibold'>{forecastDate.toLocaleDateString('en-US', { weekday: 'short' })}</h6>
                            {icon}
                            <h4 className='text-lg font-semibold text-[#626976]'>{v?.weather[0]?.main}</h4>
                            <span className='text-base mt-1 text-blue_700'>{v?.temp?.max.toFixed(0)}<sup>°</sup><small> - </small>{v?.temp?.min.toFixed(0)}<sup>°</sup></span>
                        </div>
                    })}
                </div>
            ) : (

                <div className='flex overflow-x-scroll justify-between gap-3 mt-4 forecast' style={{ overflowX: 'auto' }}>
                    {forecast.length > 0 && forecast.map((v, i) => {
                        const currentDate = new Date(v.dt_txt);
                        const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
                        const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                        const icon = weatherIcon[v.weather[0].icon] || weatherIcon.default;
                        return (
                            <div key={i} className='flex flex-col items-center justify-center py-2 min-w-32 px-2 rounded bg-blue_bg cursor-pointer'>
                                <h6 className='text-blue_700 tex-xl font-semibold'>{day}</h6>
                                <span className='text-xs text-blue_700'>{time}</span>
                                {icon}
                                <h4 className='text-lg font-semibold text-[#626976]'>{v?.weather[0]?.main}</h4>
                                <span className='text-base mt-1 text-blue_700'>{v?.main?.temp_max.toFixed(0)}<sup>°</sup><small> - </small>{v?.main?.temp_min.toFixed(0)}<sup>°</sup></span>
                            </div>
                        );
                    })}

                </div>
            )}





        </div>
    )
}

export default ExtendedForecast