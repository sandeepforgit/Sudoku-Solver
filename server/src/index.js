
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const solveSudoku = require('./solver');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3001', // replace this with your frontend URL
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/solve', (req, res) => {
    const { board } = req.body;

    if (!board || board.length !== 9 || !board.every(row => row.length === 9)) {
        return res.status(400).json({ error: 'Invalid board' });
    }

    const solved = solveSudoku(board);

    if (solved) {
        return res.json({ board });
    } else {
        return res.status(400).json({ error: 'Unable to solve' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
