import React from 'react'
import useMidi from 'react-midi-hook'
import './index.css';

const App = () => {
  const { inputs, activeKeys, listenToInputs } = useMidi();
  
  if (!inputs) {
    return <p>There are no detected devices.</p>
  } else {
    listenToInputs();
  }
  
  const keysToRender = activeKeys.map((key, index) => {
    const keyNote = key.letter + key.octave;

    if (index === activeKeys.length - 1) {
      return (<h1 key={keyNote}>{keyNote}</h1>)
    }

    return (<h2 key={keyNote}>{keyNote}</h2>)
  });

  const instructions = <p>Press a key on your keyboard</p>

  return <div className="main">{keysToRender.length ? keysToRender : instructions}</div>
}

export default App
