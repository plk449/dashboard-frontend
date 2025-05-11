import { useState } from "react";
import api from "../services/api";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](url, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Request failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, request };
}
