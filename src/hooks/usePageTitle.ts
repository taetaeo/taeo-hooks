import React from "react";

/**
 * 페이지 제목을 관리하기 위한 커스텀 React 훅입니다.
 *
 * @param {string} titleToTransform - 페이지 제목으로 설정할 문자열입니다.
 * @param {string} defaultTitle - 제목이 제공되지 않았을 때 사용할 기본 제목입니다.
 * @returns {Object} handleChangePageTitle 함수를 포함하는 객체입니다.
 */
export default function usePageTitle(titleToTransform: string = "", defaultTitle: string = "My App") {
  /**
   * 페이지 제목을 변경하고 콘솔 어서션을 처리하는 함수입니다.
   *
   * @param {string} title - 페이지 제목으로 설정할 문자열입니다.
   */
  const handleChangePageTitle = (title: string) => {
    console.assert(!!title, `결과 실패 : title에는 ${title}이 입력되어 기본 title로 ${defaultTitle}이 설정되었습니다.`);

    if (!title) return (document.title = "defaultTitle");
    return (document.title = title);
  };

  // useEffect를 사용하여 초기 제목을 설정하고 언마운트 시 정리합니다.
  React.useEffect(() => {
    console.assert(!!titleToTransform, "결과 실패 : 변경할 title의 값이 입력되지 않았습니다.");

    if (!titleToTransform) return;

    document.title = titleToTransform;

    // 언마운트 시 제목을 초기화하는 정리 함수입니다.
    return () => {
      console.assert(!!defaultTitle, "정리를 위한 defaultTitle이 제공되지 않았습니다.");
      document.title = defaultTitle;
    };
  }, []); // 빈 의존성 배열은 useEffect가 마운트 시에만 실행되도록 보장합니다.

  // handleChangePageTitle 함수를 반환합니다.
  return { handleChangePageTitle };
}
