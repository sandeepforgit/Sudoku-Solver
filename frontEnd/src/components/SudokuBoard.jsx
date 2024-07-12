
import React, { useState } from 'react';
import axios from 'axios';

const SudokuBoard = () => {
    const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (row, col, value) => {
        const newBoard = board.map((r, i) => r.map((c, j) => (i === row && j === col ? parseInt(value) || 0 : c)));
        setBoard(newBoard);
    };

    const handleSolve = async () => {
        console.log(board);
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/solve', { board });
            setBoard(response.data.board);
        } catch (error) {
            setError('Unable to solve the Sudoku puzzle.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            <table className="border-collapse border border-gray-400">
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} className="border border-gray-400">
                                    <input
                                        type="number"
                                        min="0"
                                        max="9"
                                        value={cell === 0 ? '' : cell}
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                        disabled={loading}
                                        className="w-10 h-10 text-center"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleSolve}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                {loading ? 'Solving...' : 'Solve'}
            </button>
        </div>
    );
};

export default SudokuBoard;