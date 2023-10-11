import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        var data = await res.json();
        setCities(data);
      } catch {
        alert("Error loading data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      var data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error loading city");
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(city, callback) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: { "Content-Type": "application/json" },
      });
      var data = await res.json();
      setCities([...cities, data]);
      callback();
    } catch {
      alert("Error adding city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId) {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      setCities(cities.filter((city) => city.id !== cityId));
    } catch {
      alert("Error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  const context = {
    cities,
    isLoading,
    currentCity,
    getCity,
    addCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={context}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

export { CitiesProvider, useCities };
