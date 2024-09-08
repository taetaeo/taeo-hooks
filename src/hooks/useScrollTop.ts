import React from "react";
/**
 * @description 초기 마운트시에 페이지의 상단에 위치하도록 조정하는 훅
 * SPA의 경우, 해당 훅을 사용해야만 페이지 이동시에 이전의 Scroll 위치의 영향을 받지 않게 됩니다.
 * @param {number} x 이동시킬 X 축, 초갓값은 0
 * @param {number} y 이동시킬 y축, 초깃값은 0
 */
export default function useScrollTop(x: number = 0, y: number = 0, callback?: () => void): void {
  React.useEffect(() => {
    window.scrollTo(x, y);
    if (callback && typeof callback === "function") {
      callback();
    }
  }, []);
}
