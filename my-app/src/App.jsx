import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';
import { Cloud, AlertCircle, Loader } from 'lucide-react';
import './App.css';
import { API_KEY, BASE_URL } from './api';

function App() {
  const [unit, setUnit] = useState('metric');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('weatherHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

    const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setCurrentWeather(null);
    setForecast([]);

    try {
      const weatherUrl = ${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit};
      const forecastUrl = ${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit};

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherRes.ok) {
        if (weatherRes.status === 404) throw new Error(Kota "${city}" tidak ditemukan.);
        throw new Error('Gagal mengambil data cuaca.');
      }

      if (!forecastRes.ok) {
        throw new Error('Gagal mengambil data forecast.');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      const dailyData = forecastData.list.filter(item => 
        item.dt_txt.includes("12:00:00")
      );

       let finalForecast = dailyData.slice(0, 5);

      if (finalForecast.length < 5) {
          finalForecast = [];
          for (let i = 0; i < forecastData.list.length; i += 8) {
              finalForecast.push(forecastData.list[i]);
          }
          finalForecast = finalForecast.slice(0, 5);
      }

      setCurrentWeather(weatherData);
      setForecast(forecastData);

      setSearchHistory(prev => {
        const standardizedName = weatherData.name;
        const filtered = prev.filter(item => 
          item.toLowerCase() !== city.toLowerCase()
        );

         const updated = [weatherData.city, ...filtered].slice(0, 5);
        
        localStorage.setItem('weatherHistory', JSON.stringify(updated));
        
        return updated;
      });

    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengambil data cuaca');
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

   const handleSelectHistory = (city) => {
    handleSearch(city);
  };

  const handleToggleUnit = (newUnit) => {
    setUnit(newUnit);
    if (currentWeather) {
      handleSearch(currentWeather.name);
    }
  };

   const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header unit={unit} onToggleUnit={handleToggleUnit} />
      
      <main className="max-w-6xl mx-auto p-6">
        <SearchForm 
          onSearch={handleSearch}
          searchHistory={searchHistory}
          onSelectHistory={handleSelectHistory}
          loading={loading}
        />

           {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={48} className="text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Memuat data cuaca...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={handleClearError}
                  className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {!currentWeather && !loading && !error && (
          <div className="text-center py-20">
            <Cloud size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Selamat Datang di Weather Dashboard
            </h2>
            <p className="text-gray-500">
              Cari kota untuk melihat informasi cuaca terkini
            </p>
          </div>
        )}

        {currentWeather && !loading && (
          <>
            <DetailCard weather={currentWeather} unit={unit} />
            {forecast.length > 0 && (
              <DataTable forecast={forecast} unit={unit} />
            )}
          </>
        )}
      </main>

        <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p className="text-sm">
            Data cuaca dari OpenWeatherMap API
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Weather Dashboard v1.0 - Real-time weather information
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;