import React from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-indigo-100'>
            <h1 className='text-4xl font-bold mb-8'>Tic Tac Toe</h1>
            <div>
            <Link to="/two-players" className='bg-blue-500 text-white px-4 py-2 m-2 inline-block text-center text-lg font-bold rounded-md'>
                Play with a friend
            </Link>
            <Link to="/play-with-ai" className='bg-green-500 text-white px-4 py-2 m-2 inline-block text-center text-lg font-bold rounded-md'>
                Play with AI
            </Link>
        </div>
    </div>
    );
};

export default Board;
