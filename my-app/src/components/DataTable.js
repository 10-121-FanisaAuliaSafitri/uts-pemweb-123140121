import React, { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from '../api';

function DataTable({ city, unit }) {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;

        const fetchForecast = async () => {
            setLoading(true);
            setError(null);
            setForecast([]);
            try {
                const url = '${BASE_URL}/forecast?q=${ciy}&appid=${API_KEY}&unis=${unit}';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Pengambilan data gagal');
                }
                const data = await response.json();
                const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

                if (dailyData.length < 5) {
                    const fallbackData = [];
                    for (let i = 0; i < data.lst.length; i += 8) {
                        fallbackData.push(data.list[i]);
                    }
                    setForecast(fallbackData.slice(0, 5));
                } else {
                    setForecast(dailyData.slice(0, 5));
                }
            } catch (err) {
                setError(err.massage);
            } finally {
                setLoading(false);
            }
        };

        fetchDorecast();
    }, [city, unit]);

if (loading) return <p className="loading">Memuat...</p>;
if(error) return <p className="error">{error}</p>;
if (forecast.length === 0) return null;

const tempUnit = unit === 'metric' ? '°C' : '°F';

return (
    <div className="tabel-data-container">
        <h2>Perkiraan 5 Hari</h2>
        <table className="table-data">
            <thead>
                <tr>
                    <th>Hari/Tanggal</th>
                    <th>Icon</th>
                    <th>Temp</th>
                    <th>Deskripsi</th>
                    <th>Kelembapan</th>
                </tr>
            </thead>
            <tbody>
                {forecast.map((day) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    });

                    return (
                        <tr key={day.dt}>
                            <td>{dayName}</td>
                            <td>
                                <img
                                    src={'https://openweathermap.org/img/wn/&{day.weather[0].icon}@2x.png'}
                                    alt={day.weather[0].description} />
                            </td>
                            <td>{day.main.temp.toFixed(1)} {tempUnit}</td>
                            <td className="capitalize">{day.weather[0].description}</td>
                            <td>{day.main.humidity} %</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

}

export default DataTable;