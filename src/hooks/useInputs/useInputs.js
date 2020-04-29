import { useCallback, useEffect, useState, useRef } from 'react';

/**
 * Configures and handles MIDI Inputs
 *
 * @param {Function} onMessage
 */
export default function useInputs(onMessage) {
  const [inputs, setInputs] = useState([]);
  const [isError, setError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current = inputs;
  }, [inputs]);

  /**
   * Creates and configures a new input
   *
   * @param {Object} port
   */
  const addInput = useCallback(
    (port) => {
      if (inputRef.current.filter((input) => input.id === port.id).length > 0) {
        console.warn(
          `Unable to add ${port.name}. The device is already configured.`
        );
        return;
      }

      port.onmidimessage = onMessage;
      setInputs((previouslyConnected) => [...previouslyConnected, port]);
    },
    [inputs, setInputs]
  );

  /**
   * Removes an input from the inputs list
   *
   * @param {Number} id
   */
  const removeInputById = useCallback(
    (id) => {
      return setInputs((previouslyConnected) => [
        ...previouslyConnected.filter((input) => input.id !== id)
      ]);
    },
    [setInputs]
  );

  /**
   * Routes MIDI device state changes (connection, disconnection)
   *
   * @param {Object} event
   */
  const onStateChange = useCallback(
    (event) => {
      const { port } = event;
      const { id, type, state } = port;

      // This library only supports MIDI inputs, not outputs.
      if (type !== 'input') return;

      switch (state) {
        case 'connected':
          return addInput(port);

        case 'disconnected':
          return removeInputById(id);

        default:
          console.warn(
            `Oops, received an unhandled state from the MIDI device: ${state}`
          );
          console.warn(
            `Raise an issue: https://github.com/matthewshirley/react-midi-hook/issues`
          );
      }
    },
    [addInput, removeInputById]
  );

  /**
   * Configures and adds all currently connected devices
   *
   * @param {Object} event
   */
  const addInputsCurrentlyConnected = useCallback(
    (inputs) => {
      for (
        let input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        addInput(input.value);
      }
    },
    [addInput]
  );

  /**
   * Setup event listener and configure connected MIDI devices
   *
   * @param {Object} event
   */
  const onFulfilledRequest = useCallback(
    (event) => {
      // Handles future connection changes
      event.onstatechange = onStateChange;

      // Setup all currently connceted devices
      const inputs = event.inputs.values();
      addInputsCurrentlyConnected(inputs);

      // MIDI devices are ready to be used
      setIsReady(true);
    },
    [addInputsCurrentlyConnected, setIsReady]
  );

  /**
   * Handles rejections that may occur during the requestMIDIAccess call.
   *
   * @param {Object} error
   */
  const onRejectedRequest = useCallback(
    (error) => {
      setError(error);
      setIsReady(false);
    },
    [setError, setIsReady]
  );

  /**
   * Requests access to the MIDI interface and configures currently connected
   * devices.
   */
  const initialize = useCallback(() => {
    return navigator.requestMIDIAccess({ sysex: true }).then(
      (event) => onFulfilledRequest(event),
      (error) => onRejectedRequest(error)
    );
  }, [setError]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { inputs, isError, isReady, initialize };
}
