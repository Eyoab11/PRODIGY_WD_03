const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/tictactoe', (req, res) => {
    const board = req.body.board;
    const newBoard = makeBestMove(board);
    res.json({ board: newBoard });
});

const makeBestMove = (board) => {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                board[i][j] = "O";
                return board;
            }
        }
    }
    return board;
};

app.listen(port, () => {
    console.log(`Tic Tac Toe AI server running at http://localhost:${port}`);
});
