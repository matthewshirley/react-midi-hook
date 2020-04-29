import React from 'react'
import useMidi from 'react-midi-hook'

import KeyText from './components/KeyText';
import StartButton from './components/StartButton';
import InstructionText from './components/InstructionText';

import './index.css';

const App = () => {
  const { pressedKeys, inputs, isError, isReady, initialize } = useMidi();
  
  return (
    <div>
      <StartButton initialize={initialize} />
      <div className="note">
        <KeyText pressedKeys={pressedKeys} />
        <InstructionText pressedKeys={pressedKeys} inputs={inputs} isReady={isReady} isError={isError} />
      </div>
    </div>
  );
}

export default App
