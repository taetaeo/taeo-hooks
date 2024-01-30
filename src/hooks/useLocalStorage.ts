import React, { useCallback, useEffect, useState } from "react";

const isServer = typeof window === "undefined";

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T), options = {}) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  /** 로컬 스토리지 읽기 */
  const read = () =>
    useCallback((): T => {
      // initialValue 가 함수인지 아닌지 여부 확인한다. true = 함수형일 경우 해당 함수를 호출한다. / false = 함수형이 아닐 경우 초깃값을 그대로 호출한다.
      const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;

      // SSR에서 발생할 수 있는 오류 방지하기 위해 설정. window 객체가 존재하지 않을때, localStorage에 접근 하는 것을 방지
      if (isServer) {
        return initialValueToUse;
      }

      try {
        const rawData = window.localStorage.getItem(key) as T;

        if (!rawData) return initialValueToUse;

        return rawData ? rawData : initialValueToUse;
      } catch {
        console.warn(`로컬 스토리지를 가져오는 것에 실패하였습니다. 키 : "${key}", 값 : error  `);
        return initialValueToUse;
      }
    }, [initialValue, key]);

  /** 로컬 스토리지 저장 */
  const save = () => {};

  /** 로컬 스토리지 수정 */
  const update = () => {};

  /** 로컬 스토리지 삭제 */
  const remove = () => {};

  useEffect(() => {
    setStoredValue(read());
  }, [key]);

  return { read };
}
