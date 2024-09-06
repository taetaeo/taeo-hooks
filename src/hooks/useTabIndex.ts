import * as R from "react";

/**
 * 웹 접근성을 위한 Tab 이벤트 동작 훅
 * @example
 * const tabIndex = useTabIndex();
 *
 * <TabIndex  {...tabIndex}>
 *   <컴포넌트/>
 * </TabIndex>
 */
export default function useTabIndex() {
  const handleKeyDown = (event: R.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target);
      (event.target as HTMLElement).click();
    }
  };

  return { tabIndex: 0, onKeyDown: handleKeyDown };
}
