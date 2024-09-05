import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(path, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios(`http://localhost:3000${path}`, options);
      const result = response.data.data;
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, error, loading };
}
