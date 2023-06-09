import './App.css'
import Board from "./component/Board";
import React, {useState} from "react";

function App() {

  const [history, setHistory] = useState([{squares : Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  //승자를 찾는 부분
  const calculateWinner = (squares) => {
    //이길 수 있는 라인 목록
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null
  }
  //현재
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if(winner){
    status = 'Winner:' + winner;
  }else{
    status = `Next player : ${xIsNext ? 'X':'O'}`;
  }

  // 클릭하면 일어나는 부분
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber+1);
    const newCurrent = newHistory[newHistory.length-1];
    const newSquares = newCurrent.squares.slice();
    if(calculateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext ? "X": "O";
    setHistory([...newHistory, { squares: newSquares}]);
    setXIsNext(prev => !prev);
    setStepNumber(newHistory.length);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2 === 0));
  }

  const moves = history.map((step,move)=>{
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)} className="move-button">{desc}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className="status"> {status}</div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default App;
