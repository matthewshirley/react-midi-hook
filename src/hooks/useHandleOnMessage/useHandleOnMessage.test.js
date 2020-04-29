import { renderHook, act } from '@testing-library/react-hooks';
import useHandleOnMessage from './useHandleOnMessage';

describe('useHandleOnMessage', () => {
  describe('noteOn', () => {
    it('adds a note to the state when pressed', () => {
      const { result } = renderHook(() => useHandleOnMessage());

      act(() => {
        result.current.onMessage({
          data: [144, 22, 100]
        });
      });

      expect(result.current.pressedKeys).toMatchSnapshot();
    });
  });

  describe('noteOff', () => {
    it('removes the note from the state when pressed', () => {
      const { result } = renderHook(() => useHandleOnMessage());

      act(() => {
        result.current.onMessage({
          data: [144, 22, 100]
        });

        result.current.onMessage({
          data: [128, 22, 0]
        });
      });

      expect(result.current.pressedKeys).toMatchSnapshot();
    });
  });
});
