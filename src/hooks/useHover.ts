import { useEffect, useRef, useState } from "react";

/**
 * 요소가 호버되고 있는지 여부를 추적하는 커스텀 훅입니다.
 *
 * @returns 요소를 추적하려는 ref 객체와 현재 요소가 호버 중인지 여부를 나타내는 boolean 상태를 포함한 튜플을 반환합니다.
 */
export default function useHover() {
  // 요소가 호버 중인지 여부를 저장하는 상태
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // 추적할 요소에 첨부할 ref
  const ref = useRef<HTMLElement | HTMLDivElement>(null);

  // 호버 상태를 업데이트하는 이벤트 핸들러
  const mouseEvent = {
    over: () => setIsHovering(true),
    out: () => setIsHovering(false),
  };

  useEffect(() => {
    // ref에서 현재 노드 가져오기
    const node = ref.current;

    if (node) {
      // 마우스 오버 및 아웃 이벤트 리스너 추가
      node.addEventListener("mouseover", mouseEvent.over);
      node.addEventListener("mouseout", mouseEvent.out);
    }

    // 클린업 함수: 이벤트 리스너 제거
    return () => {
      if (node) {
        node.removeEventListener("mouseover", mouseEvent.over);
        node.removeEventListener("mouseout", mouseEvent.out);
      }
    };
  }, [ref.current]); // ref가 변경될 때마다 effect를 다시 실행

  // ref와 호버 상태를 반환
  return [ref, isHovering] as const;
}
