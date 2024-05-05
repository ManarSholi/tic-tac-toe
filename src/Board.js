import Square from "./Square";

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    console.log("squares: ", squares);

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (
            squares[a] &&
            (squares[a] === squares[b]) &&
            (squares[a] === squares[c])
        ) {
            return squares[a];
        }
    }

    return null;
}

export default function Board({xIsNext, squares, onPlay}) {
    const arrayOfThree = [0, 1, 2];

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares);
    }

    let result = checkWinner(squares);

    return (
        <div className="main">
            <div className="prefix-status">
                {result.prefix} <span className="status">{result.status}</span>
            </div>
            {
                arrayOfThree.map((row) => {
                    return (
                        <div key={row} className="board-row">
                            {
                                arrayOfThree.map((col) => {
                                    const index = (row * 3) + col;
                                    return (
                                        <Square
                                            key={col}
                                            value={squares[index]}
                                            onSquareClick={() => {handleClick(index)}}
                                        />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

function checkWinner(squares, xIsNext) {
    let prefix;
    let status;
    const winner = calculateWinner(squares);
    let result = squares.every((item) => (item !== null));

    if (winner) {
        prefix = "Winner: ";
        status = winner;
    } else if (result) {
        prefix = "No one";
    } else {
        prefix = "Next player: ";
        status = (xIsNext ? "X" : "O");
    }

    return {prefix: prefix, status: status};
}