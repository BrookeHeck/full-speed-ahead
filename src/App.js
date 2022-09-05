
import GameCanvas from './components/GameCanvas';
import './App.css';
import React from 'react';
import ObstacleBoard from './components/ObstacleBoard';

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
    while(coordArr.length < 10) {
      let x = Math.floor(Math.random() * 6);
      let y = Math.floor(Math.random() * 6);
      if(!(coordArr.some(coord => coord[0] === x && coord[1] === y)) && (y !== 2 && x !== 5)) coordArr.push([x, y]);
    }
    console.log(coordArr);
    this.setState({bombCoordinates: coordArr});
  }

  componentDidMount() {

    document.addEventListener('keydown', (e) => {this.handleKeyPress(e)});
    this.getBombCoordinates();
    this.startTimer();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
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

  moveDown() {
    if(this.state.playerCoordinate[1] < 10) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] + 1];
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
      case(keyPressed === 's' || keyPressed === 'ArrowDown') : this.moveDown();
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
        {this.state.isWinner && <h2>You Win</h2>}
        {this.state.hitBomb && <h2>You Hit a bomb</h2>}
      </>
    )
  }
}

export default App;
