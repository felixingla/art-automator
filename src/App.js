import React, { useRef, useEffect } from "react";

// Defining the RandomCircles function component
function RandomCircles() {
  
  // Creating a reference to the canvas element
  const canvasRef = useRef(null);

  // Setting up event listeners to refresh the circles on user interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Defining a function to refresh the circles when the canvas is clicked or a key is pressed
    const handleRefresh = () => {
      generateCircles();
    };
    
    // Adding event listeners to the canvas and document
    canvas.addEventListener("click", handleRefresh);
    document.addEventListener("keydown", handleRefresh);

    // Generating the initial set of circles
    generateCircles();

    // Removing the event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("click", handleRefresh);
      document.removeEventListener("keydown", handleRefresh);
    };
  }, []);

  // Defining a function to generate and draw the circles on the canvas
  const generateCircles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setting canvas dimensions to match the viewport
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Defining an array of possible colors for the circles
    const colors = ["#DA615C", "#4998C9", "#F0C165"];

    // Generating an array of circle objects
    const circles = [];
    let i = 0;
    let previousRadius = 10;
    while (i < 30) {
      const radius = previousRadius * 1.10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      circles.push({ x, y, radius, color });
      i++;
      previousRadius = radius;
    }

    // Clearing the canvas before drawing the circles
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing each circle on the canvas
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

  // Returning the canvas element and author information
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
