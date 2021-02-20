import {Component} from 'react';
import './index.css';

const calculateWinner = (squares) => {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  if( !squares.includes(null) ){
    return 'No Winner'
  }else{
    return null;
  }
}

const Square = (props) => {
  return(
    <button className="square" onClick={props.onClick} style={{backgroundColor: props.backgroundGreen ? 'green' : 'white',}}>
      { props.value }
    </button>
  )
}

class Board extends Component {
  renderSquare(i) {
    if (this.props.winning_status && this.props.winning_status.includes(i)){
      return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            backgroundGreen = {true}
           />;
    }else{
      return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            backgroundGreen = {false}
           />;
    }
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i] ){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    let winning_status;
    if(winner){
      status = 'Winner: ' + winner[0];
      winning_status = winner[1];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            winning_status = {winning_status}
          />
        </div>
      </div>
    );
  }
}

export default Game
