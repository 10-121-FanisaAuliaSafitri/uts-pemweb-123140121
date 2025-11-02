import axios from 'axios';

// PERUBAHAN DI SINI:
// Key dimasukkan langsung sebagai string
const API_KEY = 'eb55369928fc60ee50e04cf513230124';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Mengambil data cuaca saat ini
 * @param {string} city - Nama kota
 * @param {string} unit - 'metric' (Celsius) atau 'imperial' (Fahrenheit)
 */
export const fetchCurrentWeather = async (city, unit) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Memberikan pesan error yang lebih jelas
    throw new Error(error.response?.data?.message || 'Kota tidak ditemukan');
  }
};

/**
 * Mengambil data forecast 5 hari (per 3 jam)
 * @param {string} city - Nama kota
 * @param {string} unit - 'metric' (Celsius) atau 'imperial' (Fahrenheit)
 */
export const fetchForecast = async (city, unit) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil forecast');
  }
};