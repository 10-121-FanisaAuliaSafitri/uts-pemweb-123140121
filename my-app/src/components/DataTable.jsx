import React from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';

const DataTable = ({ forecast, unit }) => {
  const convertTemp = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getWeatherIcon = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('hujan')) {
      return <CloudRain size={24} className="text-blue-500" />;
    }
    if (cond.includes('cloud') || cond.includes('awan') || cond.includes('berawan')) {
      return <Cloud size={24} className="text-gray-500" />;
    }
    return <Sun size={24} className="text-yellow-500" />;
  };

   return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-xl font-bold text-gray-800">Prakiraan 5 Hari ke Depan</h3>
      </div>

       <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Cuaca
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Temperatur
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Kelembaban
              </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Angin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {forecast.map((day, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {day.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm text-gray-700">{day.condition}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {convertTemp(day.temp)}°{unit}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {day.humidity}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {day.windSpeed} km/h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default DataTable; 