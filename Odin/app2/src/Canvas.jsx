import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Canvas = () => {
  // Uncomment and use these if needed
  const xpos = useSelector(state => state.xpos.xpos);
  const ypos = useSelector(state => state.ypos.ypos);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const canvas = document.getElementById('myCanvas');

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(`Mouse position: (${x}, ${y})`);
      dispatch({ type: 'SET_YPOS', payload: y});
      dispatch({ type: 'SET_XPOS', payload: x});
      
      // You can dispatch actions or draw on canvas here
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <canvas
        id="myCanvas"
        style={{
          width: '600px',
          height: '600px',
          border: '1px solid #000000',
        }}
      />
      <p>{xpos}  {ypos}</p>
    </div>
  );
};

export default Canvas;
