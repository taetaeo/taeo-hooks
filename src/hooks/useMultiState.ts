import React from "react";

interface StateType {
  [key: string]: string | string[] | any;
}

interface ActionType {
  name: string;
  value: string | any;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function useMultiState(initialState: StateType = {}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.target) return;
    return dispatch({ name: e.target?.name, value: e.target?.value });
  };

  const onClear = (name: string) => dispatch({ name, value: "" });

  return [state, dispatch, onChange, onClear];
}
