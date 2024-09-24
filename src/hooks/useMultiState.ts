import { useReducer, type Dispatch } from "react";

export interface ReducerActionType {
  name: string;
  value: unknown;
}

export type UseMultiState<T> = [
  // 초기값
  T,
  // Dispatch 함수
  Dispatch<ReducerActionType>,
  // 상태 변경 함수
  (name: string, value: unknown) => void,
  // 상태 청소 함수
  (name: string) => void
];

// Reducer 함수의 제네릭 타입을 명확하게 설정
const reducer = <T>(state: T, action: ReducerActionType): T => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

/**
 * 이 훅은 많은 상태관리를 하나의 훅으로 유용하게 하기 위해서 만들어졌습니다.
 * 다양한 상태들을 하나의 훅으로 관리하면서 더욱 편리하게 상태관리를 할 수 있습니다.
 *
 * @template StateType - 초기값을 나타내는 타입
 * @param {StateType} initialState - 상태관리 타입
 * @returns {ReturnType} 배열형태의 상태관리와 이벤트 핸들러, 삭제 핸들러를 반환한다.`
 */

export function useMultiState<T extends { [key: string]: unknown }>(initialState: T): UseMultiState<T> {
  // useReducer에서 제네릭 타입을 명확하게 전달하여 state의 타입을 유지
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * @description 상태를 변화시키는 함수
   * @param {string} name multi-state's Key
   * @param {unknown} value multi-state's value
   */

  const onChange = (name: string, value: unknown): void => {
    dispatch({ name, value });
  };

  /**
   * @description 상태를 정리하는 함수
   * @param {string} nam multi-state's key
   */
  const onClear = (name: string): void => {
    dispatch({ name, value: null });
  };

  // 반환되는 state의 타입은 T가 유지됨
  return [state as T, dispatch, onChange, onClear] as const;
}
