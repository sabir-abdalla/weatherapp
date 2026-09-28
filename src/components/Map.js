import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

let LeafletMap = props => {
    const { position, zoom, city, loading } = props;
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;

    return (
        <MapContainer key={position} center={position} zoom={zoom} style={{ height: '600px' }}>
            {loading
                ? (
                    <div>
                        {/* -------------------------------------- Base layer ------------------------------------------------ */}
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url={`https://{s}.tile.osm.org/{z}/{x}/{y}.png`}
                        />
                        {/* --------------------------------------- Cloud layer --------------------------------------- */}
                        <TileLayer
                            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                        />
                        {/* --------------------------------------- Precipitation layer --------------------------------------- */}
                        <TileLayer
                            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                        />
                        <Marker position={position}>
                            <Popup>
                                {city}
                            </Popup>
                        </Marker>
                    </div>
                ) : <h1>Loading</h1>}
        </MapContainer>
    )
}


export default LeafletMap;