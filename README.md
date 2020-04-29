# react-midi-hook
> React hook to easily use MIDI inputs via the Web MIDI API.

## Install

```bash
yarn add --save react-midi-hook
```

## Usage

```jsx
import React from 'react'
import useMidi from 'react-midi-hook'

export default function App() {}
  const { pressedKeys } = useMidi();

  return (
    <p>{pressedKeys[0].letter}</p>
  );
}
```

# Browser Support

The Web MIDI API is currently only supported on Edge, Chrome and Opera. Please refer to [Can I use](https://caniuse.com/#feat=midi) for up to date information.

## License

MIT © [matthewshirley](https://github.com/matthewshirley)
