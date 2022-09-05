
import GameCanvas from './components/GameCanvas';
import './App.css';
import React from 'react';
import ObstacleBoard from './components/ObstacleBoard';
import EndGame from './EndGame';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCoordinate: [4, 10],
      bombCoordinates: [],
      countdown: 5,
      isWinner: false,
      hitBomb: false
    }
  }

  startTimer() {
    let interval = setInterval(() => {
      let decrement = this.state.countdown - 1;
      this.setState({countdown: decrement}, () => {if(this.state.countdown <= 0) clearInterval(interval)});
    }, 1000)
  }

  getBombCoordinates() {
    let coordArr = [];
    while(coordArr.length < 12) {
      let x = Math.floor(Math.random() * 6);
      let y = Math.floor(Math.random() * 6);
      if(!(coordArr.some(coord => coord[0] === x && coord[1] === y)) && !(y === 2 && x === 5)) coordArr.push([x, y]);
    }
    this.setState({bombCoordinates: coordArr});
  }

  componentDidMount() {

    document.addEventListener('keydown', (e) => {this.handleKeyPress(e)});
    this.getBombCoordinates();
    this.startTimer();
  }

  moveRight() {
    if(this.state.playerCoordinate[0] < 9.9) {
      let newCoordinate = [this.state.playerCoordinate[0] + 1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate}, this.checkBomb);
    }
  }

  moveLeft() {
    if(this.state.playerCoordinate[0] > 0) {
      let newCoordinate = [this.state.playerCoordinate[0] - 1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate}, this.checkBomb);
    }
  }

  moveUp() {
    if(this.state.playerCoordinate[1] > .1) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] - 1];
      this.setState({playerCoordinate: newCoordinate}, this.checkBomb);
    }
  }

  moveDiagonalLeft() {
    if(this.state.playerCoordinate[1] > .1 && this.state.playerCoordinate[0] > 0) {
      let newCoordinate = [this.state.playerCoordinate[0] - 1, this.state.playerCoordinate[1] - 1];
      this.setState({playerCoordinate: newCoordinate}, this.checkBomb);
    }
  }

  moveDiagonalRight() {
    if(this.state.playerCoordinate[1] > .1 && this.state.playerCoordinate[0] < 9.9) {
      let newCoordinate = [this.state.playerCoordinate[0] + 1, this.state.playerCoordinate[1] - 1];
      this.setState({playerCoordinate: newCoordinate}, this.checkBomb);
    }
  }

  checkWin() {
    if(this.state.playerCoordinate[1] === 0 && !this.state.hitBomb) {
      this.setState({isWinner: true});
    }
  }

  checkBomb() {
    let noBomb = this.state.bombCoordinates.every(bomb => {
      return !((this.state.playerCoordinate[1]/2) === bomb[0] && (this.state.playerCoordinate[0]/2) === bomb[1]);
    });
    if(!noBomb) this.setState({hitBomb: true});
    else this.checkWin();
  }

  handleKeyPress(e) {
    let keyPressed = e.key;
    switch(true) {
      case(keyPressed === 'a' || keyPressed === 'ArrowLeft') : this.moveLeft();
      break;
      case(keyPressed === 'w' || keyPressed === 'ArrowUp') : this.moveUp();
      break;
      case(keyPressed === 'd' || keyPressed === 'ArrowRight') : this.moveRight();
      break;
      case(keyPressed === 'q') : this.moveDiagonalLeft();
      break;
      case(keyPressed === 'e') : this.moveDiagonalRight();
      break;
      default: console.log(keyPressed);
    }
  }

  render() {
    return (
      <>
        {this.state.countdown > 0 && <h2>{this.state.countdown}</h2>}
        {
          this.state.countdown > 0 ?
          <ObstacleBoard bombCoordinates={this.state.bombCoordinates}/> :
          (!this.state.isWinner && !this.state.hitBomb) && <GameCanvas  playerCoordinate={this.state.playerCoordinate} />
        }
        {(this.state.isWinner || this.state.hitBomb) && <EndGame isWinner={this.state.isWinner} /> }
      </>
    )
  }
}

export default App;
