import React, { useState, useRef, useEffect } from "react";

function RandomCircles() {
  const [numCircles, setNumCircles] = useState(getRandomNumber(25, 30));
  const canvasRef = useRef(null);

  useEffect(() => {
    generateCircles();
  }, [numCircles]);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const generateCircles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const colors = ["#DA615C", "#4998C9", "#F0C165"];

    const circles = [];
    let i = 0;
    let previousRadius = 10;
    while (i < numCircles) {
      const radius = previousRadius * 1.10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      circles.push({ x, y, radius, color });
      i++;
      previousRadius = radius;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(({ x, y, radius, color }) => {
      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      // Draw the border
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000";
      ctx.stroke();
    });
  };

  const handleRefreshClick = () => {
    setNumCircles(getRandomNumber(1, 100));
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <div style={{ position: "fixed", bottom: 10, left: 10 }}>
      RandomCircles(), 2023 · <a href="https://felixingla.com"> Felix Ingla</a>
      </div>
    </div>
  );
}

export default RandomCircles;
