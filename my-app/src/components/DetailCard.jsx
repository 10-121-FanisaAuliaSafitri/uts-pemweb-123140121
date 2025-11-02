import React from 'react';

const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

function DetailCard({ data, unit, onToggleUnit }) {
  const { name, main, weather, wind } = data;
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const speedSymbol = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-lg capitalize text-white/80">
            {weather[0].description}
          </p>
        </div>
        
        <button
          onClick={onToggleUnit}
          className="px-4 py-1 bg-fuchsia-500/30 text-white text-sm font-medium rounded-full hover:bg-fuchsia-500/40"
        >
          Ubah ke {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center mt-4">
        <div className="flex items-center justify-center sm:justify-start">
          <img
            src={getIconUrl(weather[0].icon)}
            alt={weather[0].description}
            className="w-24 h-24"
          />
          <span className="text-6xl font-light ml-2">
            {main.temp.toFixed(1)}{unitSymbol}
          </span>
        </div>

        <div className="space-y-2 text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-lg">
            Feels like: <strong>{main.feels_like.toFixed(1)}{unitSymbol}</strong>
          </p>
          <p className="text-lg">Humidity: <strong>{main.humidity}%</strong></p>
          <p className="text-lg">Wind: <strong>{wind.speed.toFixed(1)} {speedSymbol}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
