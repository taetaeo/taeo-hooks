import { useEffect } from "react";

import type { EffectCallback } from "react";

/**
 * @deprecated - 이 훅은 effect라는 매개변수를 받아서 해당 효과를 컴포넌트가 처음으로 마운트될 떄에만 실행이 되도록 구현합니다.
 * 내부적으로 useEffect를 호출하며, 의존성 배열을 빈 배열([])로 지정하여 해당 효과가 컴포넌트가 처음으로 랜더링 될 때만 실행되도록 합니다.
 * eslint-disable-next-line react-hooks/exhaustive-deps 주석이 달려 있어, ESLint 규칙 중 exhaustive-deps를 무시하도록 처리되어 있습니다.
 * @param {EffectCallback} effect - The effect to run.
 * @example
 * useEffectOnce(() => {
 *   console.log('Hello World');
 * });
 */
export function useEffectOnce(effect: EffectCallback) {
  useEffect(effect, []);
}
