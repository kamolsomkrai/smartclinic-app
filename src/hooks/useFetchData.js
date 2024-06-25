// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post(url, { query })
      .then(response => setData(response.data.data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, [url, query]);

  return { data, loading };
};

export default useFetchData;
