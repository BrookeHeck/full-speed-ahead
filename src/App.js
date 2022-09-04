
import GameCanvas from './components/GameCanvas';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCoordinate: [2, 5]
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.handleKeyPress(e)});
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  moveRight() {
    if(this.state.playerCoordinate[0] < 4.5) {
      let newCoordinate = [this.state.playerCoordinate[0] + .1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveLeft() {
    if(this.state.playerCoordinate[0] > .3) {
      let newCoordinate = [this.state.playerCoordinate[0] - .1, this.state.playerCoordinate[1]];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveUp() {
    if(this.state.playerCoordinate[1] > .4) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] - .1];
      this.setState({playerCoordinate: newCoordinate});
    }
  }

  moveDown() {
    if(this.state.playerCoordinate[1] < 5.1) {
      let newCoordinate = [this.state.playerCoordinate[0], this.state.playerCoordinate[1] + .1];
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
        <GameCanvas  playerCoordinate={this.state.playerCoordinate} />
      </>
    )
  }
}

export default App;
