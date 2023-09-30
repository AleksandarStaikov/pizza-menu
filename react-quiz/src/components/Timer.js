import { useEffect, useState } from "react";

export default function Timer({ secondsToComplete, dispatch }) {
  const [secondsRemaining, setSecondsRemaining] = useState(secondsToComplete);

  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  useEffect(() => {
    var intervalId = setInterval(() => {
      if (secondsRemaining === 0) {
        dispatch({ type: "finish" });
        return;
      }
      setSecondsRemaining(function (secondsRemaining) {
        return secondsRemaining - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, secondsRemaining]);

  return <div className="timer">{`${minutes}:${seconds}`}</div>;
}
