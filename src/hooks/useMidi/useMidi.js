import useInputs from '../useInputs/useInputs';
import useHandleOnMessage from '../useHandleOnMessage/useHandleOnMessage';

export default function useMidiDevice() {
  const inputs = useInputs();
  const { listenToInputs, activeKeys } = useHandleOnMessage(inputs);

  return { inputs, activeKeys, listenToInputs };
}
