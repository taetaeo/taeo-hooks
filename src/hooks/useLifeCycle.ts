import { useEffect } from "react";
import type { Callback } from "../types";

/**
 * 컴포넌트 라이프사이클 이벤트에 대응하는 커스텀 훅입니다.
 * @param {Callback} mount 컴포넌트가 마운트될 때 실행되는 콜백 함수
 * @param {Callback} unmount 컴포넌트가 언마운트될 때 실행되는 콜백 함수
 */
export function useLifeCycle(mount?: Callback, unmount?: Callback): void {
  useEffect(() => {
    /**
     * @event mount 컴포넌트가 마운트될 때 실행되는 부분
     */
    if (mount) {
      mount();
    }

    /**
     * @event unmount 컴포넌트가 unmount시에 실행될 부분
     */
    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행할 것을 보장
}
