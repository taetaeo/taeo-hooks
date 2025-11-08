import { useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

/**
 * 이 훅은 주어진 미디어 쿼리에 대한 상태를 관리하는 커스텀 훅입니다.
 * @param {string} query - 사용할 미디어 쿼리, 문자열로 입력합니다.
 * @returns {boolean} - boolean 값을 반환합니다.
 *  - 'media' : 주어진 미디어 쿼리에 대한 매치 결과 (true 또는 false).
 */
export function useMediaQuery(query: string): boolean {
  const [media, setMedia] = useState<boolean>(() => {
    const mediaQuery = window.matchMedia(query);
    return mediaQuery.matches;
  });

  // 컴포넌트가 업데이트되었을 때 실행되는 useEffect
  useUpdateEffect(() => {
    // 주어진 미디어 쿼리에 대한 MediaQueryList 객체 생성
    const mediaQuery = window.matchMedia(query);

    // 미디어 쿼리 상태 변경 이벤트 핸들러
    const handleMediaChage = (event: MediaQueryListEvent) => {
      // 매치 결과를 상태에 반영
      setMedia(event.matches);
    };

    // "Chnage" 이벤트 핸들러를 추가할 때는 함수 참조를 전달
    mediaQuery.addEventListener("change", handleMediaChage);

    // 초기 값 설정
    setMedia(mediaQuery.matches);

    // 컴포넌트가 언마운트되거나 미디어 쿼리 변경 시 "change" 이벤트 핸들러 제거
    return () => {
      // "Change" 이벤트 핸들러 제거
      mediaQuery.removeEventListener("change", handleMediaChage);
    };
  }, [query]);

  return media;
}
