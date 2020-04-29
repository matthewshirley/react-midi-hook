# react-midi-hook
Hook to communicate with MIDI devices using MIDIAccess.

## Install

```bash
yarn add --save react-midi-hook
```

## Usage

```jsx
import React, { Component } from 'react'
import useMidi from 'react-midi-hook'

export default function App() {}
  const { inputs, activeKeys, listenToInputs } = useMidi();

  if (inputs) listenToInputs();

  return (
    <p>{activeKeys[0].letter}</p>
  );
}
```

## License

MIT © [matthewshirley](https://github.com/matthewshirley)
