import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';

const DetailCard = ({ weather, unit }) => {
  const getWeatherIcon = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('hujan')) {
      return <CloudRain size={80} className="text-blue-400" />;
    }
    if (cond.includes('cloud') || cond.includes('awan') || cond.includes('berawan')) {
      return <Cloud size={80} className="text-gray-400" />;
    }
    return <Sun size={80} className="text-yellow-400" />;
  };

  const convertTemp = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-xl p-8 text-white mb-6">
      <h2 className="text-3xl font-bold mb-6">{weather.city}</h2>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {getWeatherIcon(weather.condition)}
          <div>
            <div className="text-6xl font-bold">
              {convertTemp(weather.temp)}°{unit}
            </div>
            <div className="text-xl mt-2">{weather.condition}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Droplets size={24} />
            <div>
              <div className="text-sm opacity-80">Kelembaban</div>
              <div className="text-xl font-semibold">{weather.humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Wind size={24} />
            <div>
              <div className="text-sm opacity-80">Kecepatan Angin</div>
              <div className="text-xl font-semibold">{weather.windSpeed} km/h</div>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;