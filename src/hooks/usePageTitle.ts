import React from "react";

export default function usePageTitle(titleToTranform: string = "", defaultTitle: string = "My App") {
  const handleChangePageTitle = (title: string) => {
    console.assert(!!title, `결과 실패 : title에는 ${title}이 입력이 되어 기본 title로 ${defaultTitle}이 설정되었습니다.`);

    if (!title) return (document.title = "defaultTitl");
    return (document.title = title);
  };

  React.useEffect(() => {
    console.assert(!!titleToTranform, "결과 실패 : 변경할 title의 값이 입력되지 않았습니다.");

    if (!titleToTranform) return;

    document.title = titleToTranform;

    return () => {
      console.assert(!!defaultTitle, "No defaultTitle provided for cleanup.");
      document.title = defaultTitle;
    };
  }, []);

  return { handleChangePageTitle };
}
