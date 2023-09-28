import { useEffect } from "react";

export function useKeyPress(key, callback) {
  useEffect(() => {
    function HandleKeyPress(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", HandleKeyPress);

    return () => document.removeEventListener("keydown", HandleKeyPress);
  }, [key, callback]);
}