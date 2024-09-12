import { useEffect } from "react";
import type { RefObject } from "react";
import type { Callback } from "../types";

/**
 *
 * useOutSideClick 훅은 특정 Ref 객체를 사용하여 외부 클릭을 감지하고, 외부 클릭이 감지되면 지정된 콜백 함수를 호출한다.
 *
 * @param {RefObject<HTMLElement>} ref - 외부 클릭을 감지할 대상 요소의 Ref 객체
 * @param {()=>void} callback - 외부 클릭이 감지되었을 때, 호출될 콜백 함수
 */
export default function useOutSideClick(ref: RefObject<HTMLElement>, callback: Callback, refs?: RefObject<HTMLElement>[]) {
  useEffect(() => {
    /**
     *
     * handleClick 함수는 mousedown 이벤트를 처리하며, 만약 ref가 유효하고 클릭된 요소가 ref의 자식이 아니라면
     * 지정된 콜백 함수를 호출한다.
     * @param {MouseEvent} event - mousedown 이벤트 객체
     */
    const handleClick = (event: MouseEvent) => {
      // 추가적인 ref들이 존재할 경우, 이 ref들 중 하나라도 클릭된 경우 콜백 호출을 방지
      if (refs && refs.some((exceptRef) => exceptRef.current?.contains(event.target as Node))) {
        return;
      }

      // 기본 ref가 유효하고 클릭된 요소가 이 ref의 자식이 아닌 경우에만 콜백 호출
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    // mousedown 이벤트에 대한 이벤트 리스너 등록
    window.addEventListener("mousedown", handleClick);

    // 컴포넌트가 언마운트되거나 업데이트될 때 이벤트 리스너를 제거하는 함수 반환
    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}
