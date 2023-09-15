import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpened, setIsOpened] = useState(true);

  const highlight = {
    backgroundColor: "#7950f2",
    color: "#fff",
  };

  function GoNext() {
    if (step < 3) {
      setStep(step + 1);
    }
  }

  function GoPrevious() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpened(!isOpened)}>&times;</button>
      {isOpened && (
        <div className="steps ">
          <div className="numbers">
            <div className={step === 1 && "active"}>1</div>
            <div className={step === 2 && "active"}>2</div>
            <div className={step === 3 && "active"}>3</div>
          </div>

          <p className="message">
            Step: {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button onClick={GoPrevious} style={step > 1 ? highlight : null}>
              Previous
            </button>
            <button onClick={GoNext} style={step < 3 ? highlight : null}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
