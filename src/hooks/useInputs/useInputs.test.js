import { renderHook } from '@testing-library/react-hooks';
import useInputs from './useInputs';

const mockMIDIAccess = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    inputs: new Set([{ id: '0', name: 'Testing', onmidimessage: '' }])
  });
});

describe('useInputs', () => {
  describe('useEffect', () => {
    beforeAll(() => {
      global.navigator.requestMIDIAccess = mockMIDIAccess;
    });

    it('sets inputs once loaded', async () => {
      const { result, waitForNextUpdate } = renderHook(useInputs);
      expect(result.current.inputs).toMatchSnapshot();
      await waitForNextUpdate();
      expect(result.current.inputs).toMatchSnapshot();
    });
  });
});
