import { useEffect, useState } from "react";
import JSConfetti from "js-confetti"

const squaresArr = new Array(9).fill(null);
function Board() {

    const [squares, setSquares] = useState(squaresArr);
    const [isXNext, setXNext] = useState(true);
    const [winner, setWinner] = useState(null);


    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [draws, setDraws] = useState(0);

    const JSConfettiInstance = new JSConfetti();

    const handleSquares = (i) => {
        if (squares[i] == null && !winner) {
            const newSquares = squares.slice();
            newSquares[i] = isXNext ? 'X' : 'O';
            setSquares(newSquares);
            setXNext(!isXNext); // fix: toggle turn correctly
        }
    };

    useEffect(() => {
        const winner = calculateWinner(squares);
        if (winner) {
            setWinner(winner);
            if (winner === 'X') {
                setXScore(prev => prev + 1);
            } else if (winner === 'O') {
                setOScore(prev => prev + 1);

            }

        } else if (squares.every(Boolean)) {
            setDraws(prev => prev + 1);
        }
    }, [squares]);





    const status = winner
        ? `Winner : ${winner}`
        : squares.every(Boolean)
            ? "It's a draw!"
            : `Next Player : ${isXNext ? "X" : "O"}`;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Tic Tac Toe</h2>
            <h3 className="text-md mb-4">{status}</h3>

            <div className="grid grid-cols-3 gap-2">
                {squares.map((value, index) => (
                    <button
                        key={index} // fix: added unique key for each item in map
                        className="w-24 h-24 bg-blue-500 text-white text-3xl font-bold flex items-center justify-center border-2 border-white transition-all hover:bg-blue-700"
                        onClick={() => handleSquares(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"
                onClick={() => {
                    setSquares(squaresArr);
                    setXNext(true);
                    setWinner(null); // reset winner when game is reset
                }}
            >
                Reset Game
            </button>

            <div className="mt-4">
                <h4 className="text-lg">Score:</h4>
                <div className="flex space-x-4">
                    <p className="text-xl">X:{xScore}</p>
                    <p className="text-xl">O:{oScore}</p>
                    <p className="text-xl">Draws:{draws}</p>

                </div>

            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const jsConfetti = new JSConfetti()

            jsConfetti.addConfetti()
            return squares[a];

        }

    }

    return null;
}

export default Board;
