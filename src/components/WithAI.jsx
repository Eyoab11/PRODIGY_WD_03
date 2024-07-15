import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WithAI = () => {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [status, setStatus] = useState('ongoing');
    const [winningCells, setWinningCells] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentPlayer === "O" && status === "ongoing") {
            makeAIMove();
        }
    }, [currentPlayer, status]);

    useEffect(() => {
        checkGameStatus();
    }, [board]);

    const checkGameStatus = () => {
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== ""
            ) {
                setStatus(`${board[i][0]} wins`);
                setWinningCells([[i, 0], [i, 1], [i, 2]]);
                return;
            }

            if (
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                board[0][i] !== ""
            ) {
                setStatus(`${board[0][i]} wins`);
                setWinningCells([[0, i], [1, i], [2, i]]);
                return;
            }
        }

        if (
            (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "")
        ) {
            setStatus(`${board[1][1]} wins`);
            setWinningCells([[0, 0], [1, 1], [2, 2]]);
            return;
        }

        if (board.flat().every(cell => cell !== "")) {
            setStatus("Draw");
        }
    };

    const handleCellClick = (row, col) => {
        if (board[row][col] === "" && currentPlayer === "X" && status === "ongoing") {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? "X" : cell))
            );
            setBoard(newBoard);
            setCurrentPlayer('O');
        }
    };

    const renderCell = (row, col) => {
        const isWinningCell = winningCells.some(cell => cell[0] === row && cell[1] === col);
        const cellClassName = `w-24 h-24 bg-white border-2 border-gray-800 text-2xl font-bold ${isWinningCell ? 'bg-blue-200' : ''}`;

        return (
            <button
                key={`${row}-${col}`}
                onClick={() => handleCellClick(row, col)}
                className={cellClassName}
                disabled={loading || status !== 'ongoing' || board[row][col] !== ""}
            >
                {board[row][col]}
            </button>
        );
    };

    const makeAIMove = async () => {
        setLoading(true);
        try {
            const bestMove = miniMax(board, 'O');
            const newBoard = board.map((row, i) =>
                row.map((cell, j) => (i === bestMove.row && j === bestMove.col ? 'O' : cell))
            );
            setBoard(newBoard);
            setCurrentPlayer('X');
            setStatus('ongoing');
        } catch (error) {
            console.error("Error making AI move:", error);
        }
        setLoading(false);
    };

    const resetGame = () => {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);
        setCurrentPlayer('X');
        setStatus('ongoing');
        setWinningCells([]);
    };

    const miniMax = (currentBoard, player) => {
        const result = checkWin(currentBoard);
        if (result === 'X') {
            return { score: -1 };
        } else if (result === 'O') {
            return { score: 1 };
        } else if (result === 'Draw') {
            return { score: 0 };
        }

        let moves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoard[i][j] === '') {
                    let move = {};
                    move.row = i;
                    move.col = j;
                    currentBoard[i][j] = player;

                    if (player === 'O') {
                        move.score = miniMax(currentBoard, 'X').score;
                    } else {
                        move.score = miniMax(currentBoard, 'O').score;
                    }

                    currentBoard[i][j] = '';
                    moves.push(move);
                }
            }
        }

        let bestMove;
        if (player === 'O') {
            let bestScore = -Infinity;
            moves.forEach(move => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            });
        } else {
            let bestScore = Infinity;
            moves.forEach(move => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            });
        }

        return bestMove;
    };

    const checkWin = (board) => {
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== ""
            ) {
                return board[i][0];
            }

            if (
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                board[0][i] !== ""
            ) {
                return board[0][i];
            }
        }

        if (
            (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "")
        ) {
            return board[1][1];
        }

        if (board.flat().every(cell => cell !== "")) {
            return "Draw";
        }

        return null;
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-indigo-100'>
            <h1 className='text-4xl font-bold mb-8'>Tic Tac Toe with AI</h1>
            <div className='flex flex-col gap-1'>
                {board.map((row, index) => (
                    <div className='flex flex-row gap-1' key={index}>
                        {row.map((_, colIndex) => (
                            <React.Fragment key={`${index}-${colIndex}`}>
                                {renderCell(index, colIndex)}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <div className='text-xl'>Status: {status}</div>
            <div>
                <button className='bg-blue-500 text-white px-4 py-2 m-2 rounded-xl' onClick={resetGame}>Reset Game</button>
                <Link className='bg-red-500 text-white px-4 py-2 m-2 rounded-xl' to={"/"}>Play with 2 players</Link>
            </div>
        </div>
    );
};

export default WithAI;
