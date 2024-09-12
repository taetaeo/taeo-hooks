import type { DependencyList } from "react";
import { useEffect, useRef } from "react";

/**
 * 컴포넌트가 처음 마운트될 때가 아닌, 업데이트 시에만 실행되는 사용자 정의 React 훅입니다.
 *
 * @param callback - 컴포넌트 업데이트 시에 실행될 콜백 함수입니다.
 * @param deps - 콜백을 실행할 조건으로 설정된 의존성 배열입니다.
 */

export default function useUpdateEffect(callback: () => void, deps: DependencyList): void {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      callback();
    } else {
      console.log("첫 번째 마운트입니다. 업데이트가 아닙니다.");
      ref.current = true;
    }
  }, [...deps]);
}
