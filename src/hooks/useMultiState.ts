import React from "react";

interface StateType {
  [key: string]: string | string[] | any;
}

interface ActionType {
  name: string;
  value: string | any;
}

type DispatchType = React.Dispatch<ActionType>;
type ChangeEventType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
type ClearEventType = (name: string) => void;
type ReturnType = [StateType, DispatchType, ChangeEventType, ClearEventType];

/**
 * 이 훅은 많은 상태관리를 하나의 훅으로 유용하게 하기 위해서 만들어졌습니다.
 * 다양한 상태들을 하나의 훅으로 관리하면서 더욱 편리하게 상태관리를 할 수 있습니다.
 *
 * @template StateType - 초기값을 나타내는 타입
 * @param {StateType} initialState - 상태관리 타입
 * @returns {ReturnType} 배열형태의 상태관리와 이벤트 핸들러, 삭제 핸들러를 반환한다.
 */

const reducer = (state: StateType, action: ActionType): StateType => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function useMultiState(initialState: StateType = {}): ReturnType {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.target) return;
    return dispatch({ name: e.target?.name, value: e.target?.value });
  };

  const onClear = (name: string) => dispatch({ name, value: "" });

  return [state, dispatch, onChange, onClear];
}
