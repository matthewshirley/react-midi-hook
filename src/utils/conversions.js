import NOTES from '../constants/notes';
import COMMANDS from '../constants/commands';

/**
 *
 * @param {Number} noteNumber
 */
export function getNoteLetter(noteNumber) {
  const note = NOTES[noteNumber];

  if (!note) {
    throw new Error('Caught.InvalidNoteNumber');
  }

  return note;
}

/**
 * Gets an easily human readible command. Result was developed using:
 * https://www.computermusicresource.com/MIDI.Commands.html
 *
 * @param {Number} command Number representing a MIDI Command
 *
 * @returns {String} the human readable command
 */
export function getMIDICommand(command) {
  if (command >= 128 && command <= 143) {
    return COMMANDS.NOTE_OFF;
  } else if (command >= 144 && command <= 159) {
    return COMMANDS.NOTE_ON;
  } else if (command >= 160 && command <= 175) {
    return COMMANDS.POLY_KEY_PRESSURE;
  } else if (command >= 176 && command <= 191) {
    return COMMANDS.CONTROL_CHANGE;
  } else if (command >= 192 && command <= 207) {
    return COMMANDS.PROGRAM_CHANGE;
  } else if (command >= 208 && command <= 223) {
    return COMMANDS.MONO_KEY_PRESSURE;
  } else if (command >= 224 && command <= 239) {
    return COMMANDS.PITCH_BEND;
  } else if (command >= 240 && command <= 255) {
    return COMMANDS.SYSTEM;
  }

  throw new Error('Uncaught.MIDI');
}

export default getMIDICommand;
