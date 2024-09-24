import { useNavigate } from "react-router-dom";
import type { Callback } from "../types";

/**
 * 페이지 내비게이션을 관리하는 커스텀 훅입니다.
 * React Router의 useNavigate 훅을 이용하여 페이지 이동을 처리합니다.
 * @returns {Object} - 페이지 내비게이션 관련 함수들을 포함한 객체
 */
export function usePageNavigation() {
  // React Router의 useNavigate 훅을 사용하여 네비게이션 객체를 얻어옵니다.
  const navigate = useNavigate();

  /**
   * @description 페이지 뒤로가기 기능
   * @param {Callback} callback - 콜백함수
   */
  const goToBackward = (callback?: Callback) => {
    navigate(-1);

    if (typeof callback === "function") {
      callback();
    }
  };

  /**
   * @description 페이지 앞으로 가기 기능
   * @param {Callback} callback - 콜백함수
   */
  const goToForward = (callback?: Callback) => {
    navigate(1);

    if (typeof callback === "function") {
      callback();
    }
  };

  /**
   * @description 페이지 이동 기능
   * @param {string} path - 이동할 페이지의 url
   * @param {Callback[]} args - callback()함수
   * @returns {void} - 페이지 이동
   */
  const move = (path: string, ...args: Callback[]) => {
    navigate(path);

    if (typeof args[0] === "function") {
      args[0]();
    }
    if (typeof args[1] === "function") {
      args[1]();
    }
    if (typeof args[2] === "function") {
      args[2]();
    }
  };

  /**
   * @description 다른 브라우저 창에서 페이지 이동 기능
   * @param {string} url - 이동할 페이지의 URL
   * @param {"_blank" | "_parent" | "_self" | "_top"} name - 새 창의 이름 (기본값: "_blank")
   * @description
      - _blank : 새 창에 열립니다. 이것이 기본값입니다.
      - parent : 부모 프레임에 열립니다.
      - _self : 현재 페이지를 대체합니다.
      - _top : 로드된 프레임셋을 대체합니다
   * @param {string} options - 새 창의 옵션
   * @returns {void} - 브라우저 이동
   * 
   */
  const moveOtherBrowser = (url: string, name: "_blank" | "_parent" | "_self" | "_top" = "_blank", option: string): void => {
    window.open(url, name, option);
  };

  /**
   * @description 페이지 이동 - 메인
   */
  const goToHome = () => navigate("/");

  return {
    goToBackward,
    goToForward,
    goToHome,
    move,
    moveOtherBrowser,
  };
}
