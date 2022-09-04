import React, { useRef, useEffect } from 'react'

const ObstacleCanvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        context.strokeStyle = 'black';
        context.strokeRect(y * 100, x * 100, 100, 100);
      }
    }

    props.bombCoordinates.forEach(coord => {
      context.fillStyle = 'red';
      context.fillRect(coord[1] * 100, coord[0] * 100, 100, 100);
    });

  }, [props.bombCoordinates]);
  
  return <canvas ref={canvasRef} width='600px' height='600px'/>
}

export default ObstacleCanvas;
