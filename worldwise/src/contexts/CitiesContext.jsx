import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return { ...state, error: action.payload, isLoading: false };

    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };

    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };

    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoading: false,
      };

    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        var data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Error loading data" });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      var data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Error loading city" });
    }
  }

  async function addCity(city, callback) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: { "Content-Type": "application/json" },
      });
      var data = await res.json();
      dispatch({ type: "cities/created", payload: data });
      callback();
    } catch {
      dispatch({ type: "error", payload: "Error creating city" });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: cityId });
    } catch {
      dispatch({ type: "error", payload: "Error deleting city" });
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
