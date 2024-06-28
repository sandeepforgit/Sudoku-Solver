// src/App.js
import React from "react";
import SudokuBoard from "./components/SudokuBoard";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-2xl font-bold my-4">Sudoku Solver</header>
          <SudokuBoard />
          

          
    </div>
  );
}

export default App;
