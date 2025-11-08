import { useEffect } from "react";

/**
 * 이 훅은 현재 위치한 페이지의 제목을 변경하기 위한 커스텀 훅입니다.
 * SPA의 특성상 하나의 DOM안에 프로젝트가 내제되어 있기 때문에, 실제 라우트시에 페이지가 변하는 것이 아닌 올려져있는 레이아웃이
 * 변경됩니다. 따라서, 제목은 그대로 유지되어 있어 이를 적절하게 변경하기 위한 기능의 훅입니다.
 *
 * @param {string} titleToTransform - 페이지 제목으로 설정할 문자열입니다.
 * @param {string} defaultTitle - 제목이 제공되지 않았을 때 사용할 기본 제목입니다.
 * @returns {Object} handleChangePageTitle 함수를 포함하는 객체입니다.
 */
export function usePageTitle(titleToTransform: string = "", defaultTitle: string = "My App") {
  /**
   * 페이지 제목을 변경하고 콘솔 어서션을 처리하는 함수입니다.
   * @param {string} title - 페이지 제목으로 설정할 문자열입니다.
   */
  const handleChangePageTitle = (title: string) => {
    console.assert(!!title, `결과 실패 : title에는 ${title}이 입력되어 기본 title로 ${defaultTitle}이 설정되었습니다.`);

    if (!title) return (document.title = "defaultTitle");
    return (document.title = title);
  };

  // useEffect를 사용하여 초기 제목을 설정하고 언마운트 시 정리합니다.
  useEffect(() => {
    console.assert(!!titleToTransform, "결과 실패 : 변경할 title의 값이 입력되지 않았습니다.");

    if (!titleToTransform) return;

    document.title = titleToTransform;

    return () => {
      console.assert(!!defaultTitle, "정리를 위한 defaultTitle이 제공되지 않았습니다.");
      document.title = defaultTitle;
    };
  }, []);

  return { handleChangePageTitle };
}
