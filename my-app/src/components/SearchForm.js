import React, { usestate } from 'react';
import { API_KEY, GEO_URL } from '../api';

function SearchForm ({ onSearch, history }) {
    const [query, setquery] = useState(' ');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if(length.value > 2) {
            try {
                const response = await fetch(&`{GEO_URL}/direct?q=&{value}&limit=5&appid=${API_KEY}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    const uniqueSuggestions = [
                        ...new Set(data.mao(city => '${city.name}, ${city.country}'))
                    ];
                    setSuggestions(uniqueSuggestions);
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                console.error('Terjadi kesalahan saat mengambil suggest kota:', err);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventSubmit();
        if (query) {
            onSearch(query.trim());
            setQuery(' ');
            setSuggestions([]);
        }
    };

    const handleHistoryClick = (city) => {
        onSearch(city);
        setQuery('');
        setSuggestions([]);
    };

    return(
        <div className="searchForm">
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleInputChange} placeholder="Masukkan nama kota... " list="Suggestions" />
                <datalist id="city-suggestions">
                    {suggestions.map((city, index) => {
                        <option key={index} value={city} />
                    })}
                </datalist>
                <button type="submit">Cari</button>
            </form>

            <div className="search-history">
                {history.length > 0 && <span>Penelusuran Terakhir: </span>}
                {history.map((city) => (
                    <button key={city} onClick={() => handleHistoryClick(city)} className="history-button">
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchForm;