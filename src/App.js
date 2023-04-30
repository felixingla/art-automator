import React, { useState, useRef } from "react";

function RandomCircles() {
  const [numCircles, setNumCircles] = useState(10);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  const generateCircles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const circles = [];
    let i = 0;
    let previousRadius = 10;
    while (i < numCircles) {
      const radius = previousRadius * 1.10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = ["#4998C9"][Math.floor(Math.random() * 1)];
      const number = i + 1;
      circles.push({ x, y, radius, color, number });
      i++;
      previousRadius = radius;
    }

    circles.forEach(({ x, y, radius, color, number }) => {
      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      // Draw the border
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#F1F1EF";
      ctx.stroke();
    });
  };

  const handleInputChange = (event) => {
    setNumCircles(event.target.value);
  };

  const handleInputEnter = (event) => {
    if (event.key === "Enter") {
      generateCircles();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <input
        ref={inputRef}
        type="number"
        value={numCircles}
        onChange={handleInputChange}
        onKeyDown={handleInputEnter}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      />
    </div>
  );
}

export default RandomCircles;
