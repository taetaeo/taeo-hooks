import type { KeyboardEvent } from "react";

export type UseTabIndex = {
  tabIndex: number;
  onKeyDown: (event: KeyboardEvent) => void;
};

/**
 * 이 훅은 웹 접근성을 위한 Tab 이벤트 동작의 기능을 위한 훅입니다.
 *
 * @returns {UseTabIndex} 다음을 포함하는 객체를 반환합니다.
 *  - 'tabIndex' : tabIndex 순서값 (0)
 *  - 'onKeyDown' : onKeyDown 이벤트시 해당하는 tabIndex 가진 요소 Click 이벤트 발생
 *
 * @example
    const tabIndex = useTabIndex();
    <TabIndex  {...tabIndex}>
      <컴포넌트/>
    </TabIndex>
 */
export function useTabIndex(): UseTabIndex {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      (event.target as HTMLElement & HTMLDivElement).click();
    }
  };

  return { tabIndex: 0, onKeyDown: handleKeyDown };
}
