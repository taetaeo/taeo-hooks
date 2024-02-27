import { useEffect, useRef } from "react";

/**
 * 이 훅은 컴포넌트가 언마운트(Unmount)시 clean-up를 할 때, 실행할 콜백 함수를 받습니다.
 * @param {()=>void} func - 언마운트 시 실행될 정리 함수입니다.
 * @see [document](https://taeo.gitbook.io/taeo/taeo-hooks/useunmount)
 * @example
 * // 함수형 컴포넌트에서 사용하는 예제
 * useUnmount(() => {
 *   // 여기에 정리 로직 작성
 * });
 */

export default function useUnmount(func: () => void) {
  // useRef를 사용하여 함수를 저장할 ref 객체 funcRef를 생성합니다.
  const funcRef = useRef(func);

  // funcRef.current에 전달된 함수를 저장합니다.
  funcRef.current = func;

  // useEffect를 사용하여 컴포넌트가 처음 렌더링될 때 실행될 콜백 함수를 등록합니다.
  useEffect(
    // 반환된 함수는 컴포넌트가 언마운트될 때 실행됩니다.
    () => () => {
      // funcRef.current에 저장된 함수를 실행합니다.
      funcRef.current();
    },
    // 두 번째 매개변수로 빈 배열을 전달하여 useEffect가 처음 렌더링될 때만 실행되도록 합니다.
    []
  );
}
