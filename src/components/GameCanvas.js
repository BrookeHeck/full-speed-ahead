import React, { useRef, useEffect } from 'react'

const GameCanvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // let bombImg = new Image();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        // make a 6x6 grid
        context.strokeStyle = 'black';
        context.strokeRect(y * 100, x * 100, 100, 100);

        if([x, y] === props.bombCoordinates) {

        }
      }
      // draw the player on the canvas
      context.beginPath();
      context.arc(props.playerCoordinate[0] * 125, props.playerCoordinate[1] * 110, 30, 0, 2 * Math.PI);
      context.stroke();
    }
  }, [props.playerCoordinate, props.bombCoordinates]);
  
  return <canvas ref={canvasRef} width='600px' height='600px'/>
}

export default GameCanvas;
