import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface UseCounterOutput {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}
/**
 *
 * 숫자를 조작하는 커스텀 훅
 * @param {number} initialNumber - 초깃값 숫자
 * @returns {object}
 * @property {Function} increment - 숫자가 1씩 증가
 * @property {Function} decrement - 숫자가 1씩 감소
 * @property {Function} reset - 초깃값으로 변경 및 0
 * @property {Function} setCount - 직접 숫자 조작
 */
export const useCounter = (initialNumber: number): UseCounterOutput => {
  const [count, setCount] = useState(() => {
    return initialNumber ?? 0;
  });

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(initialNumber ?? 0);
  };

  return { count, increment, decrement, reset, setCount };
};
