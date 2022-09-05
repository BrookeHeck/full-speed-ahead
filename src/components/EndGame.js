import React from 'react';
import Button from 'react-bootstrap/Button';

class EndGame extends React.Component {
  render() {
    return (
      <>
        <h2>{this.props.isWinner ? 'You Win!' : 'You Hit a Bomb!!'}</h2>
        <Button onClick={() => window.location.reload(false)}>Play Again</Button>
      </>
    );
  }
}

export default EndGame;