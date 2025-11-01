import React, { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from '../api';

function DetailCard({ city, unit }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!city) return;

        const fetchCurrentWeather = async () => {
            setLoading(true);
            setError(null);
            setWeather(null);
            try {
                const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Kota tidak ditemukan atau terjadi kesalahan');
                }
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentWeather();
    }, [city, unit]);

    if (loading) return <p className="loading">Memuat Cuaca Hari ini...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!weather) return null;

    const { name,main, weather: weatherInfo, wind } = weather;
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';

    return (
        <div className="detail-kartu">
            <h2>Cuaca saat ini di {name}</h2>
            <img
            src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
            alt={weatherInfo[0].description} />
            <p className="capitalize"><strong>{weatherInfo[0].description}</strong></p>
            <p>Temperatur: {main.temp.toFixed(1)} {tempUnit}</p>
            <p>Kecepatan Angin: {wind.speed.toFixed(1)} {windUnit}</p> 
            <p>Kelembapan: {main.humidity} %</p>
        </div>
    );
}

export default DetailCard;