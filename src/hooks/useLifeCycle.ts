import { useEffect } from "react";

type LifecycleCallback = () => void;

/**
 * 컴포넌트 라이프사이클 이벤트에 대응하는 커스텀 훅입니다.
 * @param {LifecycleCallback} mount 컴포넌트가 마운트될 때 실행되는 콜백 함수
 * @param {LifecycleCallback} unmount 컴포넌트가 언마운트될 때 실행되는 콜백 함수
 */
export default function useLifeCycle(mount?: LifecycleCallback, unmount?: LifecycleCallback): void {
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
  }, []); // 빈 배열 : 컴포넌트가 마운트될 때 한 번만 실행됨을 보장하도록 합니다.
}
