import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  useEffect(() => {
    var intervalId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return <div className="timer">{`${minutes}:${seconds}`}</div>;
}
