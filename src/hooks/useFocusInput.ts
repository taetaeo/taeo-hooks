import React, { RefObject } from "react";

/**
 * input에 글자가 다 채워지면 다음 input으로 자동 focus하도록 하는 훅
 *
 * @param {*} refs input의 ref를 담은 객체
 * @param {*} nameList input태그의 name ['phoneFirst', 'phoneSecond', 'phoneThirds', 'emlAddr']
 * @returns focusNextInput focus 이벤트를 실행할 이벤트핸들러
 */

interface UseFocusInputProps {
  refs: Record<string, RefObject<HTMLInputElement>>;
  nameList: string[];
}

interface UseFocusInputResult {
  focusNextInput: (currentInputName: string) => void;
}

export function useFocusInput({ refs = {}, nameList = [] }: UseFocusInputProps): UseFocusInputResult {
  const focusNextInput = (currentInputName: string) => {
    const currentIndex = nameList.indexOf(currentInputName);

    if (currentIndex < nameList.length - 1) {
      const nextInputName = nameList[currentIndex + 1];
      if (refs[nextInputName] && refs[nextInputName].current) {
        refs[nextInputName].current.focus();
      }
    }
  };

  return { focusNextInput };
}
