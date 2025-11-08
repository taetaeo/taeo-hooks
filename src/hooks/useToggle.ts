import { useState, useCallback } from "react";

export type UseToggle = {
  value: boolean;
  toggle: () => void;
  setToggle: (newValue: boolean) => void;
};

/**
 * 이 훅은 토글의 상태관리 기능을 하는 훅입니다.
 * @param {boolean} initialValue - 초기 토글의 상태값.
 * @returns {UseToggle}
 *  - 'state' : 현재 상태.
 *  - 'toggle' : 토글의 상태를 업데이트하는 함수.
 *  - 'setToggle' : 원하는 값으로 상태를 직접 업데이트하는 함수.
 */

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  const setToggle = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return { value, toggle, setToggle };
}
