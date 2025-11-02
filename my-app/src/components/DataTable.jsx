import React from 'react';

const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('id-ID', { weekday: 'long' });
};
const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}.png`;

function DataTable({ data, unit }) {
  const dailyData = data.list.filter(item => 
    item.dt_txt.includes("12:00:00")
  );
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg overflow-x-auto">
      <h3 className="text-2xl font-bold mb-4">5-Day Forecast</h3>
      
      <table className="w-full min-w-max text-left">
        
        <thead>
          <tr className="border-b-2 border-fuchsia-300/30">
            <th className="py-2 px-3">Hari</th>
            <th className="py-2 px-3">Cuaca</th>
            <th className="py-2 px-3">Suhu (Min/Max)</th>
            <th className="py-2 px-3">Kelembapan</th>
          </tr>
        </thead> 
        
        <tbody>
          {dailyData.map((day) => (
            <tr key={day.dt} className="border-b border-fuchsia-300/10 hover:bg-fuchsia-500/10">
              <td className="py-3 px-3 font-medium">{formatDay(day.dt)}</td>
              <td className="py-3 px-3 flex items-center gap-2">
                <img
                  src={getIconUrl(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="w-8 h-8"
                />
                <span className="capitalize text-sm text-white/80">
                  {day.weather[0].description}
                </span>
              </td>
              <td className="py-3 px-3">
                {day.main.temp_min.toFixed(0)}° / {day.main.temp_max.toFixed(0)}{unitSymbol}
              </td>
              <td className="py-3 px-3">{day.main.humidity}%</td>
            </tr>
          ))}
        </tbody>

      </table> 

    </div> 
  );
}

export default DataTable;
