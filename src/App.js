import React, { useState } from "react";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomShape() {
  const shapes = ["circle", "square", "triangle"];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function getRandomRadius() {
  return Math.floor(Math.random() * 50) + 50;
}

function getRandomOffset() {
  return Math.floor(Math.random() * 30) - 15;
}

function App() {
  const [shapes, setShapes] = useState([]);

  const handleClick = () => {
    const newShapes = [];
    for (let i = 0; i < 3; i++) {
      const shape = {
        id: i,
        type: getRandomShape(),
        color: getRandomColor(),
        radius: getRandomRadius(),
        offset: getRandomOffset(),
      };
      newShapes.push(shape);
    }
    setShapes(newShapes);
  };

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <h1 style={{ color: "white" }}></h1>
      <button onClick={handleClick}>Draw Shapes</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              width: `${shape.radius}px`,
              height: `${shape.radius}px`,
              backgroundColor: shape.color,
              margin: "20px",
              borderRadius: "50% / 60%",
              transform:
                shape.type === "triangle"
                  ? `rotate(-45deg) translate(${shape.offset}px, ${shape.offset}px)`
                  : `translate(${shape.offset}px, ${shape.offset}px)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
