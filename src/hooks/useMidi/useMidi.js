import useInputs from '../useInputs';
import useHandleOnMessage from '../useHandleOnMessage';

/**
 * Interface to MIDIAccess to handle MIDI inputs and messages.
 */
export default function useMidi() {
  if (!navigator.requestMIDIAccess) {
    throw new Error('This browser does not support MIDIAccess');
  }

  const { event, pressedKeys, onMessage } = useHandleOnMessage();
  const { inputs, isError, isReady, initialize } = useInputs(onMessage);

  return { event, pressedKeys, inputs, isError, isReady, initialize };
}
