import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

interface Options {
  initialSave: boolean;
}

const isServer = typeof window === "undefined";

/**
 * 이 훅은 로컬스토리지를 관리하는 커스텀 훅 입니다.
 * 기본적으로 로컬스토리지의 값을 읽기, 저장, 삭제, 업데이트 등의 기능을 제공하고 있습니다.
 * @param {string} key - 로컬 스토리지의 Key
 * @param {T} initialValue - 로컬 스토리지의 초깃값
 * @param {Options} options - 훅에서 쓰이는 옵션 값
 * @returns {()=>{}} read(읽기), save(저장), remove(삭제), update(업데이트 마운트)
 */

/**
 *
 * @param options
 * @description options의 기능에 대한 설명
 * initialSave : 스토리지에 저장된 값이 없을 경우, 초기값을 저장할 것인지 말 것인지 type : boolean
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T), options: Options = { initialSave: false }) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const isStorageEvent = (event: StorageEvent | CustomEvent): event is StorageEvent => {
    return "key" in event;
  };

  /** 로컬 스토리지 읽기 */
  const readValueFromLocalStorage = (): T => {
    const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;

    // SSR에서 발생할 수 있는 오류 방지하기 위해 설정. window 객체가 존재하지 않을때, localStorage에 접근 하는 것을 방지
    if (isServer) {
      return initialValueToUse;
    }

    try {
      const rawData = window.localStorage.getItem(key) as T;

      /** 값이 없을 경우 */
      if (typeof rawData === "object" && rawData === null && options.initialSave) {
        save(initialValueToUse);
        return initialValueToUse;
      }

      return rawData ? rawData : initialValueToUse;
    } catch {
      console.warn(`로컬 스토리지를 가져오는 것에 실패하였습니다. 키 : "${key}", 값 : error  `);
      return initialValueToUse;
    }
  };
  // read함수 메모이제이션
  const read = useCallback<() => T>(() => {
    return readValueFromLocalStorage();
  }, []);

  useEffect(() => {
    setStoredValue(read());
  }, [key]);

  /** 로컬 스토리지 읽기 */

  /** 로컬 스토리지 저장 */
  const saveValueFromLocalStorage = (value: T) => {
    if (isServer) {
      console.warn("브라우저 환경에서만 사용 가능합니다. 서버환경에서 사용이 불가능합니다.");
      return undefined;
    }

    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.error("실패 : 로컬 스토리지 용량이 부족합니다.");
      } else {
        console.warn(`로컬 스토리지에 값을 저장하는 데 실패했습니다. 키: "${key}"`);
      }
    }
  };

  const save: SetValue<T> = useCallback(async (value: T) => {
    return await saveValueFromLocalStorage(value);
  }, []);
  /** 로컬 스토리지 저장 */

  /** 로컬 스토리지 변화에 따른 상태관리 감지 */
  const update = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if (isStorageEvent(event) && event.key !== key) return;
      setStoredValue(read());
    },
    [key, read]
  );
  /** 로컬 스토리지 변화에 따른 상태관리 감지 */

  /** 로컬 스토리지 삭제 */
  const remove = () => {
    if (isServer) {
      console.warn("현재 브라우저 환경이 아닙니다.");
      return key;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.warn(`로컬 스토리지에서 항목을 삭제하는 데 실패했습니다. 키: "${key}"`);
      return;
    }
  };

  return { read, save, remove, update };
}
