import { useRef, useEffect } from "react";

export default function useClickOutside(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    window.addEventListener("click", handleClick, listenCapturing);

    return () =>
      window.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
