import React from 'react';
import Text from '../Text';

export default function KeyText({ pressedKeys }) {
  if (pressedKeys.length === 0) return (null);

  const keysToRender = pressedKeys.map((key, index) => {
    const keyNote = key.letter + key.octave;

    if (index === pressedKeys.length - 1) {
      return (<Text as="h1" key={keyNote} px={2}>{keyNote}</Text>)
    }

    return (<Text as="h2" key={keyNote} px={2}>{keyNote}</Text>)
  });

  return keysToRender;
}
