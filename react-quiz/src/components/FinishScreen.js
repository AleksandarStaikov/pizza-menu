export default function FinishScreen({
  points,
  possiblePoints,
  dispatch,
  highscore,
}) {
  const percentage = Math.round((points / possiblePoints) * 100);

  return (
    <>
      <div className="result">
        <h2>Quiz Complete!</h2>
        <p>
          You scored <strong>{points}</strong> out of {possiblePoints} (
          {percentage}%)
        </p>
        <p>Hightscore: {highscore}</p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Try Again
      </button>
    </>
  );
}
