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

    const minRadius = 5;
    const maxRadius = 5;

    for (let i = 0; i < numCircles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      const color = "red";

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
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
