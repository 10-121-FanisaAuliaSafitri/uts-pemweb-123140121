import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput.trim());
      setCityInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-6">
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Masukkan nama kota..."
        required
        minLength="3"
        className="w-full max-w-md px-4 py-2 
                   bg-white/10 text-white placeholder-white/60 
                   border border-white/20 rounded-lg 
                   backdrop-blur-md focus:outline-none 
                   focus:ring-2 focus:ring-fuchsia-300/50"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-fuchsia-500/30 text-white 
                   rounded-lg backdrop-blur-md 
                   border border-white/20 
                   hover:bg-fuchsia-500/40 transition-colors"
      >
        Cari
      </button>
    </form>
  );
}

export default SearchForm;
