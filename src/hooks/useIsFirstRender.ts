import { useRef } from "react";

/**
 * 컴포넌트의 처음 랜더링 여부를 나타내기 위한 커스텀 훅입니다.
 *
 * 1. 첫 마운트시 (isFirstMount.current === true)
 * isFirstMount는 useRef를 통해 생성된 객체로 초깃값이 true
 * 함수가 처음 호출 시 isFirstMount.current가 true 이므로, 조건문이 실행
 * isFirstMount.current를 false로 변경하고 true로 반환
 *
 * 2. 이후 랜더링 때 (isFirstMount.current === false)
 * isFirstMount.current가 이전에 false로 변경이 되었기 때문에, 조건문이 실행되지 않음
 * 즉, isFirstMount.current의 현재값인 false가 반환이됨.
 *
 * 특정 코드 블록을 실행하고 처음 랜더링떄만 부수 작업할 수 있는 효과를 줄 수 있다.
 * @returns {boolean}
 */
export default function useIsFirstRender(): boolean {
  // useRef를 사용하여 컴포넌트가 처음 렌더링되었는지 추적하는 ref 객체를 생성합니다.
  const isFirstMount = useRef(true);

  // 첫 번째 마운트시
  if (isFirstMount.current) {
    // isFirstMount를 false로 변경하고, true를 반환합니다.
    isFirstMount.current = false;
    return true;
  }

  // 현재 렌더링이 처음이 아니면 false를 반환합니다.
  return isFirstMount.current;
}
