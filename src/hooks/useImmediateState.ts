import * as React from "react";

/**
 * React의 비동기 상태 업데이트에 의존하지 않고, 상태를 동기적으로 업데이트하고
 * 최신 상태를 가져올 수 있게 해주는 커스텀 훅입니다.
 *
 * @param {T} initialValue - 초기 상태 값.
 *
 * @returns 다음을 포함하는 배열을 반환합니다:
 * - `state`: 현재 상태.
 * - `setImmediateState`: 상태를 업데이트하고 최신 값을 ref에 저장하는 함수.
 * - `getImmediateState`: 최신 상태 값을 동기적으로 가져오는 함수.
 */

export type UseImmediateState<T> = [
  T, // 상태 값
  (value: T) => void, // setImmediateState 함수
  () => T // getImmediateState 함수
];

export default function useImmediateState<T>(initialValue: T): UseImmediateState<T> {
  // 현즤 값에 대한 상태관리
  const [state, setState] = React.useState(initialValue);

  // 최신 상태 값을 동기적으로 저장하는 ref
  const stateRef = React.useRef(state);

  /**
   * @description 상태와 최신 상태 값을 저장하는 ref를 모두 업데이트합니다.
   * @param value - 설정할 새로운 상태 값.
   */
  const setImmediateState = React.useCallback((value: T) => {
    stateRef.current = value; // 새로운 상태 값을 ref에 저장
    setState(value); // 상태를 업데이트 (React에서 비동기로 처리됨)
  }, []);

  /**
   * @description 동기적으로 최신 상태 값을 ref에서 반환합니다.
   * @returns 최신 상태 값.
   */
  const getImmediateState = React.useCallback(() => stateRef.current, []);

  return [state, setImmediateState, getImmediateState];
}
