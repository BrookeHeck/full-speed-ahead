
import GameCanvas from './components/GameCanvas';
import './App.css';
import React from 'react';
import ObstacleBoard from './components/ObstacleBoard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCoordinate: [4, 10],
      bombCoordinates: [[3, 3], [1, 1], [5, 5], [4, 4]],
      countdown: 5
    }
  }

  startTimer() {
    let interval = setInterval(() => {
      let decrement = this.state.countdown - 1;
      this.setState({countdown: decrement}, () => {if(this.state.countdown <= 0) clearInterval(interval)});
    }, 1000)
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.handleKeyPress(e)});
    this.startTimer();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  moveRight() {
    if(this.state.playerCoordinate[0] < 9.9) {
      let newCoordinate = [this.state.playerCoordinate[0] + 1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveLeft() {
    if(this.state.playerCoordinate[0] > 0) {
      let newCoordinate = [this.state.playerCoordinate[0] - 1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveUp() {
    if(this.state.playerCoordinate[1] > .1) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] - 1];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveDown() {
    if(this.state.playerCoordinate[1] < 10) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] + 1];
      this.setState({playerCoordinate: newCoordinate});
    }
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
        <h2>{this.state.countdown}</h2>
        {
          this.state.countdown > 0 ?
          <ObstacleBoard bombCoordinates={this.state.bombCoordinates}/> :
          <GameCanvas  playerCoordinate={this.state.playerCoordinate} />
        }
      </>
    )
  }
}

export default App;
