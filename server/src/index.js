const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const solveSudoku = require("./solver");

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/solve", (req, res) => {
  const { board } = req.body;
  if (!board || board.length !== 9 || !board.every((row) => row.length === 9)) {
    return res.status(400).json({ error: "Invalid board" });
  }

  const solved = solveSudoku(board);
  if (solved) {
    return res.json({ board });
  } else {
    return res.status(400).json({ error: "Unable to solve" });
  }
  res.json(solved);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
