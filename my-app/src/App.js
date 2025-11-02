import React from 'react'
import Header from './components/header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';

function App() {
  const [selectCity, setSelectedCity] = useState ('');
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('weatherUnit') || 'metric';
  });
  const [history, setHistor] = useState(() => {
    const saveHistory = localStorage.getItem('weatherHistory');
    return saveHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (history.length > 0 && !selectedCity) {
      setSelectedCity(history[0]);
    }
  }, [history]);

  const handleSearch = (city) => {
    const newHistory = [
      city,
      ...history.filter(item => item.toLowerCase() !== city.toLowerCase())
    ];

    setHistory (newHistory.slice(0, 5));
    setSelectedCity(city);
  };

  const handleUnitToggle = () => {
      setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="App">
      <header unit={unit} onUnitToggle={handleUnitToggle} />

      <searchForm 
        onSearch={handleSearch}
        history={history}
      />

      {selectedCity ? (
      <>
        <DetailCard city={selectedCity} unit={unit} />
        <DateTable city={selectedCity} unit={unit} />
      </>
      ) : (
        <p classNAme='loading'>Silahkan masukkan nama kota untuk memulai.</p>
      )};
    </div>
  );
}

export default App;
