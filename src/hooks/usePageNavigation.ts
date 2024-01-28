import { useNavigate } from "react-router-dom";

/** URL 타입 */
type UrlType = string;
type NameType = "_blank" | "_parent" | "_self" | "_top";

/**
 * 페이지 내비게이션을 관리하는 커스텀 훅입니다.
 * React Router의 useNavigate 훅을 이용하여 페이지 이동을 처리합니다.
 * @returns {Object} - 페이지 내비게이션 관련 함수들을 포함한 객체
 */

export default function usePageNavigation() {
  // React Router의 useNavigate 훅을 사용하여 네비게이션 객체를 얻어옵니다.
  const navigate = useNavigate();

  /** 페이지 뒤로가기 기능 */
  const onGoBackword = () => navigate(-1);

  /** 페이지 앞으로 가기 기능 */
  const onGoForward = () => navigate(1);

  /**
   * 페이지 이동 기능
   * @param { UrlType } path - 이동할 페이지의 url
   * @returns {vodi} - 페이지 이동
   */
  const move = (path: UrlType) => navigate(path);

  /**
   * 다른 브라우저 창에서 페이지 이동 기능
   * @param {UrlType} url - 이동할 페이지의 URL
   * @param {string} name - 새 창의 이름 (기본값: "_blank")
   * @description
      - _blank : 새 창에 열립니다. 이것이 기본값입니다.
      - parent : 부모 프레임에 열립니다.
      - _self : 현재 페이지를 대체합니다.
      - _top : 로드된 프레임셋을 대체합니다
   * @param {string} options - 새 창의 옵션
   * @returns {void} - 브라우저 이동
   * 
   */
  const moveOtherBrower = (url: UrlType, name: NameType = "_blank", option: string): void => {
    window.open(url, name, option);
  };

  /** 페이지 이동 - 메인 */
  const onGoHome = () => navigate("/");

  return {
    onGoBackword,
    onGoForward,
    onGoHome,
    move,
    moveOtherBrower,
  };
}
