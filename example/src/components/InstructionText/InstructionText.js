import React from "react";
import Text from "../Text";

const STRINGS = {
  errorOnAccess: 'Uh oh, the browser is not supported or there was an error',
  waitingForAccess: 'Waiting for access',
  waitingForConnection: 'Waiting for device',
  ready: 'Press a key on your MIDI device',
}

export default function InstructionText({ pressedKeys, inputs, isReady, isError }) {
  if (pressedKeys.length > 0) return (null);

  let stringToRender;

  if (isError) {
    stringToRender = STRINGS['errorOnAccess']
  } else if (isReady && inputs.length > 0) {
    stringToRender = STRINGS['ready'];
  } else if (isReady) {
    stringToRender = STRINGS['waitingForConnection']
  } else if (!isReady) {
    stringToRender = STRINGS['waitingForAccess']
  }

  return (
    <Text>{stringToRender}</Text>
  )
}