import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BasicGrid() {
  //const [lastSelected, setLastSelected] = useState('');


  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.count);
  const text = useSelector(state => state.string.text);

  const updateLastSelected = (newText) => {
   console.log('Updating both values:', newText);
    dispatch({ type: 'INCREMENT' });
    dispatch({ type: 'SET_TEXT', payload: newText });
  }

  return (
    <div
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        backgroundColor: '#edf1f1ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Main Content */}
      <h1 style={{ margin: '20px 0' }}>
        This is a full-width container so let us see how big it gets
      </h1>
      <p>The content inside this div will span the entire width of the page.</p>
      <button
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
        }}
        onClick={() => updateLastSelected("Fred")}>
        Full Width Button
      </button>
      <p>Last Selected is {text} </p>
    </div>
  );
}

export default BasicGrid