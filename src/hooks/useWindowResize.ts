import { useEffect, useState, useCallback, useMemo } from "react";

interface IWindowSize {
  width: number;
  height: number;
}

/**
 * 이 훅은 브라우저창의 크기를 추적하는 훅입니다.
 * @returns 추적하여 현재 브라우저창의 크기를 나타내는 객체를 반환합니다.
 */

export default function useWindowResize(): IWindowSize {
  // 윈도우 크기 상태 및 '초기 값'
  const [windowSize, setWindowSize] = useState<IWindowSize>({ width: window.innerWidth, height: window.innerHeight });

  // 크기가 변경될 때 호출되는 콜백 함수
  const handleResize = useCallback(() => {
    // 현재 브라우저창의 크기로 '상태 업데이트'합니다.
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // 컴포넌트가 마운트 될 때 이벤트 리스너를 '등록' 하거나 '해제'합니다.
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // useMemo를 사용하여 '불필요한 재계산 방지'합니다.
  // windowSize가 변경되지 않으면 이전에 계산된 값을 그대로 사용합니다.
  return useMemo(() => windowSize, [windowSize]);
}
