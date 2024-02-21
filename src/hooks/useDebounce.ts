import React, { useState } from "react";
import useUpdateEffect from "./useUpdateEffect";

/**
 * 값에 대한 디바운스를 도와주는 훅
 * @template T - 디바운스할 값의 타입
 * @param {T} value - 디바운스할 값
 * @param {number} delay - 디바운스를 위한 지연 시간(밀리초), 기본값은 500으로 설정
 * @returns {T} debouncedValue 디바운스된 값
 *
 * @example
 * const debouncedValue = useDebounce(keyword, 300)
 */
export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useUpdateEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
