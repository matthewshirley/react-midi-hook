import COMMANDS from '../../constants/commands';

import { useCallback, useState } from 'react';
import { getNoteLetter, getMIDICommand } from '../../utils/conversions';

/**
 * Handles MIDI message events
 */
export default function useHandleOnMessage() {
  const [pressedKeys, setPressedKey] = useState([]);

  /**
   * Handles "NOTE_ON" events
   *
   * @param {Number} position the real key position
   * @param {Number} velocity the input velocity
   */
  const noteOn = useCallback(
    ({ position, velocity }) => {
      const octave = parseInt(position / 12 + 1, 10);
      const letter = getNoteLetter(position % 12);

      return setPressedKey((keysStillPressed) => [
        ...keysStillPressed,
        { position, octave, letter, velocity }
      ]);
    },
    [setPressedKey]
  );

  /**
   * Handles "NOTE_OFF" events
   *
   * @param {Number} position the real key position
   */
  const noteOff = useCallback(
    ({ position }) => {
      return setPressedKey((keysStillPressed) => [
        ...keysStillPressed.filter((key) => key.position !== position)
      ]);
    },
    [setPressedKey]
  );

  /**
   * Handles incoming MIDI events from input devices
   *
   * @param {Object} event
   */
  const onMessage = useCallback(
    (event) => {
      const [command, note, velocity] = event.data;

      // Real keyboard notes are different to MIDI notes
      const position = note - 21;
      const type = getMIDICommand(command);

      if (type === COMMANDS.NOTE_ON) return noteOn({ position, velocity });
      if (type === COMMANDS.NOTE_OFF) return noteOff({ position });
    },
    [noteOn, noteOff]
  );

  return { pressedKeys, onMessage };
}
