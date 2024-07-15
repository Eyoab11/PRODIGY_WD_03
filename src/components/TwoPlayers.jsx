import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const TwoPlayers = () => {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [status, setStatus] = useState('ongoing');
    const [winningCells, setWinningCells] = useState([]);
    const [userInteracted, setUserInteracted] = useState(false);

    const handleUserInteraction = () => {
        if (!userInteracted) {
            setUserInteracted(true);
        }
    };

    const checkGameStatus = (newBoard) => {
        for (let i = 0; i < 3; i++) {
            if (
                newBoard[i][0] === newBoard[i][1] &&
                newBoard[i][1] === newBoard[i][2] &&
                newBoard[i][0] !== ""
            ) {
                setStatus(`${newBoard[i][0]} wins`);
                setWinningCells([[i, 0], [i, 1], [i, 2]]);
                return;
            }

            if (
                newBoard[0][i] === newBoard[1][i] &&
                newBoard[1][i] === newBoard[2][i] &&
                newBoard[0][i] !== ""
            ) {
                setStatus(`${newBoard[0][i]} wins`);
                setWinningCells([[0, i], [1, i], [2, i]]);
                return;
            }
        }

        if (
            newBoard[0][0] === newBoard[1][1] &&
            newBoard[1][1] === newBoard[2][2] &&
            newBoard[0][0] !== ""
        ) {
            setStatus(`${newBoard[0][0]} wins`);
            setWinningCells([[0, 0], [1, 1], [2, 2]]);
            return;
        }

        if (
            newBoard[0][2] === newBoard[1][1] &&
            newBoard[1][1] === newBoard[2][0] &&
            newBoard[0][2] !== ""
        ) {
            setStatus(`${newBoard[0][2]} wins`);
            setWinningCells([[0, 2], [1, 1], [2, 0]]);
            return;
        }

        if (newBoard.flat().every(cell => cell !== "")) {
            setStatus("Draw");
        }
    };

    const handleCellClick = (row, col) => {
        handleUserInteraction();

        if (board[row][col] === "" && status === "ongoing") {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
            );
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            checkGameStatus(newBoard);
        }
    };

    const renderCell = (row, col) => {
        const isWinningCell = winningCells.some(cell => cell[0] === row && cell[1] === col);
        return (
            <button
                key={`${row}-${col}`}
                onClick={() => handleCellClick(row, col)}
                className={`w-24 h-24 ${isWinningCell ? 'bg-green-200' : 'bg-white'} border-2 border-gray-800 text-2xl font-bold`}
                disabled={board[row][col] !== "" || status !== 'ongoing'}
            >
                {board[row][col]}
            </button>
        );
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

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-indigo-100' onClick={handleUserInteraction}>
            <h1 className='text-4xl font-bold mb-8'>Two Players Tic Tac Toe</h1>
            <div className='flex flex-col gap-1'>
                {board.map((row, rowIndex) => (
                    <div className='flex flex-row gap-1' key={rowIndex}>
                        {row.map((_, colIndex) => (
                            <React.Fragment key={`${rowIndex}-${colIndex}`}>
                                {renderCell(rowIndex, colIndex)}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <div className='text-xl'> Status: {status}</div>
            <div>
                <button className='bg-red-500 text-white px-4 py-2 m-2 rounded-xl' onClick={resetGame}>Play Again</button>
                <Link className='bg-blue-500 text-white px-4 py-2 m-2 rounded-xl' to={"/play-with-ai"}>Play with AI</Link>
            </div>
        </div>
    );
};

export default TwoPlayers;
