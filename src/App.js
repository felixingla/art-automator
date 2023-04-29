import React, { useState, useEffect, useRef } from "react";

function RandomCircles() {
  const [numCircles, setNumCircles] = useState(1000);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const circles = [];
    let i = 0;
    while (i < numCircles) {
      const radius = 20;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      let overlapping = false;
      for (let j = 0; j < circles.length; j++) {
        const other = circles[j];
        const distance = Math.hypot(x - other.x, y - other.y);
        if (distance < radius + other.radius) {
          overlapping = true;
          break;
        }
      }
      if (!overlapping) {
        const color = ["#4998C9"][Math.floor(Math.random() * 1)];
        const number = i + 1;
        circles.push({ x, y, radius, color, number });
        i++;
      }
    }

    circles.forEach(({ x, y, radius, color, number }) => {
      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw the number
      ctx.font = `${radius}px Arial`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(number, x, y);
    });
  }, [numCircles]);

  const handleInputChange = (event) => {
    setNumCircles(event.target.value);
  };

  const handleInputEnter = (event) => {
    if (event.key === "Enter") {
      setNumCircles(inputRef.current.value);
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
