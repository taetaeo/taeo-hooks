import * as React from "react";

export type UseStateWithCallback<T> = [T, (newState: T, callback?: (state: T) => void) => void];

export function useStateWithCallback<T>(initialValue: T): UseStateWithCallback<T> {
  const [state, setState] = React.useState<T>(initialValue);
  const callbackRef = React.useRef<((state: T) => void) | null>(null);

  const setStateWithCallback = React.useCallback((newState: T, callback?: (state: T) => void) => {
    callbackRef.current = callback || null;
    setState(newState);
  }, []);

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallback];
}
