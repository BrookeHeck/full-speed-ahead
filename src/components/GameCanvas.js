import React, { useRef, useEffect } from 'react'

const GameCanvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const oceanGIF = new Image();
    oceanGIF.src = '../img/ocean.gif';
    oceanGIF.onload = () => context.drawImage(oceanGIF, 0, 0, 600, 600);
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        context.strokeStyle = 'black';
        context.strokeRect(y * 100, x * 100, 100, 100);
      }
    }

    context.fillStyle = 'blue';
    context.fillRect(props.playerCoordinate[0] * 50, props.playerCoordinate[1] * 50, 100, 100);
  }, [props.playerCoordinate, props.bombCoordinates]);
  
  return <canvas ref={canvasRef} width='600px' height='600px'/>
}

export default GameCanvas;
