import React, { useState, useEffect } from 'react';
import { Search, History } from 'lucide-react';

const SearchForm = ({ onSearch, searchHistory, onSelectHistory }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cities = [
    'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi', 'Bogor', 'Malang', 'Yogyakarta', 'Denpasar', 'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Singapore', 'Bangkok',
    'Seoul', 'Dubai', 'Mumbai', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Toronto', 'Los Angeles', 'Chicago', 'San Francisco', 'Boston', 'Miami', 'Seattle'
  ];

  useEffect(() => {
    if (city.length > 0) {
      const filtered = cities.filter(c => 
        c.toLowerCase().includes(city.toLowerCase())
      );
       setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    setCity('');
  };

   return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)} onKeyPress={handleKeyPress}
              placeholder="Masukkan nama kota..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                     {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Search size={20} />
            Cari
          </button>
        </div>
      </div>
       {searchHistory.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <History size={18} />
            <span className="font-semibold">Riwayat Pencarian:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectHistory(item)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                 {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
