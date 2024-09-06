import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * 동기적으로 동작하는 상태관리
 * @param {T} initialValue
 * @returns {ReturnTypeUseSynchronousState<T>}
 */

export type ReturnTypeUseSynchronousState<T> = [T, (newState: T, callback?: (state: T) => void) => void];

export default function useSynchronousState<T>(initialValue: T): ReturnTypeUseSynchronousState<T> {
  console.log('0', initialValue);

  const [state, setState] = useState<T>(() => {
    return initialValue;
  });
  const callbackRef = useRef<((state: T) => void) | null>(null);

  // setState
  const setSynchronousState = useCallback((newState: T, callback?: (state: T) => void) => {
    callbackRef.current = callback || null;
    setState(newState);
  }, []);

  useEffect(() => {
    // 상태가 업데이트된 후 콜백 함수가 존재하면 실행
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null; // 콜백 함수 초기화
    }
  }, [state]);

  console.log('1', state);
  return [state, setSynchronousState];
}
