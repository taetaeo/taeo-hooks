import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

/** CheckBox Hooks */
/** Props Type */
interface IUseCheckBoxProps {
  id: string;
  title: string;
  length: number;
}
/** Return Type */
interface IUseCheckBoxResult {
  checkItems: string[];
  checkBox: ICheckBoxModule[];
  handleSingleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllClear: () => void;
}

/**
 * 체크박스 상태 관리를 위한 커스텀 훅입니다.
 * @param {IUseCheckBoxProps} param0 - 훅에 전달되는 속성들입니다.
 * @returns {IUseCheckBoxResult} - 체크박스 상태와 관련 함수들이 담긴 결과입니다.
 */
export default function useCheckbox({ id = "", title = "", length = 1 }: IUseCheckBoxProps): IUseCheckBoxResult {
  const [checkItems, setCheckItems] = useState<string[]>([]);

  /** 메모이제이션된 체크박스 아이템 - length가 변경될 떄만 다시 계산하고 그렇지 않은 겨웅 계산한 값을 재사용 * */
  const checkBox = useMemo(() => {
    return CheckBox.GET({ id, title }, length);
  }, [length]);

  /** 개별 체크 박스 선택*/
  const handleSingleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((item) => item !== id));
    }
  };

  /** 전체 체크 박스 선택 */
  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e?.target;
    if (checked) {
      const idArray = checkBox.map((item) => item.id);
      setCheckItems(idArray);
    } else {
      handleAllClear();
    }
  };

  /** 전체 체크 박스 체크 해제 */
  const handleAllClear = () => setCheckItems([]);

  return {
    checkItems,
    checkBox,
    handleSingleCheck,
    handleAllCheck,
    handleAllClear,
  };
}
/** CheckBox Hooks */

/** CheckBox Module */

interface ICheckBoxModule {
  id: string;
  title: string;
}

/**
 * 체크박스 모듈과 리스트 길이를 기반으로 체크박스 아이템을 생성하는 유틸리티 함수입니다.
 * @param {ICheckBoxModule} param0 - 체크박스 모듈 (id와 title)입니다.
 * @param {number} listLength - 체크박스 리스트의 길이입니다.
 * @returns {ICheckBoxModule[]} - 체크박스 아이템 배열입니다.
 */
function getCheckBox({ id = "", title = "" }: ICheckBoxModule, listLength: number): ICheckBoxModule[] {
  const boxType = { id, title };
  const result: ICheckBoxModule[] = [];

  if (!listLength) return [boxType];

  for (let i = 1; i <= listLength; i++) result.push({ id: `${id}${i}`, title: `${title}${i}` });
  return result;
}

export const CheckBox = {
  GET: getCheckBox,
};
/** CheckBox Module */
