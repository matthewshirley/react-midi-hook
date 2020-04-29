import COMMANDS from '../../constants/commands';

import { useCallback, useState } from 'react';
import { getNoteLetter, getMIDICommand } from '../../utils/conversions';

export default function useHandleOnMessage(inputs) {
  const [activeKeys, setActiveKeys] = useState([]);

  const noteOn = useCallback(
    ({ position, velocity }) => {
      const octave = parseInt(position / 12 + 1, 10);
      const letter = getNoteLetter(position % 12);

      return setActiveKeys((keysStillPressed) => [
        ...keysStillPressed,
        { position, octave, letter, velocity }
      ]);
    },
    [setActiveKeys]
  );

  const noteOff = useCallback(
    ({ position }) => {
      return setActiveKeys((keysStillPressed) => [
        ...keysStillPressed.filter((key) => key.position !== position)
      ]);
    },
    [setActiveKeys]
  );

  const onMidiMessage = useCallback(
    (event) => {
      const [command, note, velocity] = event.data;

      const position = note - 21;
      const type = getMIDICommand(command);

      if (type === COMMANDS.NOTE_ON) return noteOn({ position, velocity });
      if (type === COMMANDS.NOTE_OFF) return noteOff({ position });
    },
    [noteOn, noteOff]
  );

  const listenToInputs = useCallback(() => {
    if (!inputs) throw new Error('Caught.NoInput');

    for (
      let input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      input.value.onmidimessage = onMidiMessage;
    }
  }, [inputs, onMidiMessage]);

  return { listenToInputs, activeKeys };
}
