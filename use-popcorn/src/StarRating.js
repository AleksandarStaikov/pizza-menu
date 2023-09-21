import React, { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const styleContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "0",
  margin: "1",
};

export default function StarRating({
  totalStars = 5,
  rating = 0,
  color = "#fcc419",
  size = 48,
  readonly = false,
  onRate = (f) => f,
}) {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);

  function handleOnSelect(index) {
    if (readonly) return;
    setCurrentRating(index);
    onRate(index);
  }

  function handleOnMouseOver(index) {
    if (readonly) return;
    setHoverRating(index);
  }

  function handleOnMouseOut() {
    if (readonly) return;
    setHoverRating(0);
  }

  return (
    <div style={containerStyle}>
      <div style={styleContainerStyle}>
        {Array.from({ length: totalStars }).map((n, i) => (
          <Star
            index={i + 1}
            isSelected={
              hoverRating ? i + 1 <= hoverRating : i + 1 <= currentRating
            }
            onSelect={() => handleOnSelect(i + 1)}
            onMouseOver={() => handleOnMouseOver(i + 1)}
            onMouseOut={() => handleOnMouseOut()}
            key={i}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {hoverRating || currentRating}
      </p>
    </div>
  );
}

function Star({ isSelected, onSelect, onMouseOver, onMouseOut, size, color }) {
  const starStyle = {
    cursor: "pointer",
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
  };

  return (
    <span
      onClick={onSelect}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={starStyle}
    >
      {isSelected ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
