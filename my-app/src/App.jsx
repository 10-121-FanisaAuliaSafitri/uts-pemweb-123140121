import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';
import { fetchCurrentWeather, fetchForecast } from './api';

const STORAGE_KEY = 'uts_weather_history';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [unit, setUnit] = useState('metric');

  // ... (Logika state dan effect lainnya tetap sama) ...
  const [searchHistory, setSearchHistory] = useState(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (!city) return;
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setCurrentWeather(null);
      setForecast(null);
      try {
        const [currentData, forecastData] = await Promise.all([
          fetchCurrentWeather(city, unit),
          fetchForecast(city, unit),
        ]);
        setCurrentWeather(currentData);
        setForecast(forecastData);
        const cityName = currentData.name;
        if (!searchHistory.includes(cityName)) {
          setSearchHistory((prevHistory) => [
            cityName,
            ...prevHistory.slice(0, 4),
          ]);
        }
      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [city, unit]);

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };
  const handleHistoryClick = (historyCity) => {
    setCity(historyCity);
  };
  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Header />

      <SearchForm onSearch={handleSearch} />

      {/* Menampilkan Search History */}
      {searchHistory.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="self-center text-sm font-medium">Terakhir dicari:</span>
          {searchHistory.map((historyCity) => (
            <button
              key={historyCity}
              onClick={() => handleHistoryClick(historyCity)}
              /* PERUBAHAN: hover:bg-pink-500 -> hover:bg-fuchsia-500 */
              className="px-3 py-1 bg-white/10 text-white text-sm rounded-full backdrop-blur-md hover:bg-fuchsia-500/20 transition"
            >
              {historyCity}
            </button>
          ))}
        </div>
      )}

      <main>
        {/* Conditional rendering untuk loading & error */}
        {loading && (
          /* PERUBAHAN: text-pink-100 -> text-fuchsia-100 */
          <p className="text-center text-xl text-fuchsia-100">Memuat data...</p>
        )}

        {error && (
          <p className="text-center text-xl text-white p-4 bg-red-500/30 rounded-lg backdrop-blur-md border border-red-500/50">
            Error: {error}
          </p>
        )}

        {!loading && !error && currentWeather && (
          <DetailCard
            data={currentWeather}
            unit={unit}
            onToggleUnit={handleToggleUnit}
          />
        )}

        {!loading && !error && forecast && (
          <DataTable data={forecast} unit={unit} />
        )}
      </main>
    </div>
  );
}

export default App;