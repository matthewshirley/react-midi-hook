import { useEffect, useState } from 'react'

export default function useInputs() {
  const [inputs, setInputs] = useState(null)

  useEffect(() => {
    navigator.requestMIDIAccess({ sysex: true }).then(
      (event) => setInputs(event.inputs.values()),
      (event) => console.warn('error')
    )
  }, [setInputs])

  return inputs
}
