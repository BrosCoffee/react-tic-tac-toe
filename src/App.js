import {Component} from 'react';
import './index.css';

// class Square extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//   render() {
//     return (
//       <button className="square"
//               onClick={()=>this.props.onClick()}
//       >
//         { this.props.value }
//       </button>
//     );
//   }
// }

const Square = (props) => {
  return(
    <button className="square" onClick={props.onClick}>
      { props.value }
    </button>
  )
}

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const new_squares = this.state.squares.slice();
    // if(this.state.xIsNext){
    //   new_squares[i] = 'X';
    //   const xIsNext = false;
    //   this.setState({squares: new_squares, xIsNext: xIsNext});
    // }else{
    //   new_squares[i] = 'O'
    //   const xIsNext = true;
    //   this.setState({squares: new_squares, xIsNext: xIsNext});
    // }
    if(this.calculateWinner(this.state.squares) || new_squares[i] ){
      return;
    }
    new_squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      squares: new_squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
           />;
  }

  calculateWinner(squares) {
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
        return squares[a];
      }
    }
    if( !squares.includes(null) ){
      return 'No Winner'
    }else{
      return null;
    }
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X':'O') ;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game
