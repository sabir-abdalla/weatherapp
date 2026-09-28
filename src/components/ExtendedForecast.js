import React, { useState } from 'react'
import { weatherIcon } from './WeatherIcons.js'; // Import icons

// Turn a unix timestamp (seconds) into a Date shifted to the city's local time.
// Read the result with timeZone: 'UTC' so the shift isn't applied twice.
const toCityDate = (dt, timezone) => new Date((dt + timezone) * 1000);

// Group the 3-hour entries into one summary per day
const buildDaily = (forecast, timezone) => {
    const days = {};

    forecast.forEach((v) => {
        const d = toCityDate(v.dt, timezone);
        const key = d.toISOString().slice(0, 10);
        const hour = d.getUTCHours();

        if (!days[key]) {
            days[key] = { key, date: d, max: -Infinity, min: Infinity, best: v, bestGap: Infinity };
        }
        const day = days[key];
        day.max = Math.max(day.max, v.main.temp_max);
        day.min = Math.min(day.min, v.main.temp_min);

        // use the entry closest to midday for the icon and description
        const gap = Math.abs(hour - 12);
        if (gap < day.bestGap) {
            day.bestGap = gap;
            day.best = v;
        }
    });

    return Object.values(days);
};

const ExtendedForecast = ({ forecast = [], timezone = 0 }) => {
    const [forecastView, setForecastView] = useState('daily');

    const daily = buildDaily(forecast, timezone);

    return (
        <div className='bg-light_white rounded-xl py-8 px-5 md:px-10 flex flex-col gap-4 mt-4' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 3px" }}>
            <div className='flex justify-between items-center gap-2'>
                <h6 className='text-blue_400 text-lg font-medium'>Extended Forecast</h6>
                <div className='flex bg-blue_bg rounded-sm'>
                    <button className={`w-16 text-sm p-1 ${forecastView === 'daily' ? 'bg-blue_800 text-white' : 'bg-transparent text-blue_700'}`} onClick={() => setForecastView('daily')}>Daily</button>
                    <button className={`w-16 text-sm  p-1 ${forecastView === 'hourly' ? 'bg-blue_800 text-white' : 'bg-transparent text-blue_700'}`} onClick={() => setForecastView('hourly')}>Hourly</button>
                </div>
            </div>

            {forecast.length === 0 && (
                <p className='text-blue_700 text-sm'>Forecast not available right now.</p>
            )}

            {forecastView === 'daily' ? (
                // Daily
                <div className='flex overflow-x-auto justify-between gap-3 mt-4 forecast'>
                    {daily.map((day) => {
                        const icon = weatherIcon[day.best.weather[0].icon] || weatherIcon.default;
                        const weekday = day.date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });

                        return <div className='flex flex-col items-center justify-center py-2 min-w-32 px-2 rounded bg-blue_bg cursor-pointer' key={day.key}>
                            <h6 className='text-blue_700 tex-xl font-semibold'>{weekday}</h6>
                            {icon}
                            <h4 className='text-lg font-semibold text-[#626976]'>{day.best.weather[0].main}</h4>
                            <span className='text-base mt-1 text-blue_700'>{day.max.toFixed(0)}<sup>°</sup><small> - </small>{day.min.toFixed(0)}<sup>°</sup></span>
                        </div>
                    })}
                </div>
            ) : (
                // Hourly (every 3 hours)
                <div className='flex overflow-x-scroll justify-between gap-3 mt-4 forecast' style={{ overflowX: 'auto' }}>
                    {forecast.map((v, i) => {
                        const d = toCityDate(v.dt, timezone);
                        const day = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
                        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' });
                        const icon = weatherIcon[v.weather[0].icon] || weatherIcon.default;
                        return (
                            <div key={i} className='flex flex-col items-center justify-center py-2 min-w-32 px-2 rounded bg-blue_bg cursor-pointer'>
                                <h6 className='text-blue_700 tex-xl font-semibold'>{day}</h6>
                                <span className='text-xs text-blue_700'>{time}</span>
                                {icon}
                                <h4 className='text-lg font-semibold text-[#626976]'>{v.weather[0].main}</h4>
                                <span className='text-base mt-1 text-blue_700'>{v.main.temp_max.toFixed(0)}<sup>°</sup><small> - </small>{v.main.temp_min.toFixed(0)}<sup>°</sup></span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default ExtendedForecast
