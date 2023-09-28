import { useEffect, useState } from "react";

export function useLocalStorageState(localStorageKey, defaultValue) {
  const [value, setValue] = useState(function () {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
}
