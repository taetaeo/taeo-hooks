import React from "react";
/**
 * toggle의 기능을 하는 커스텀 훅이다.
 *매개변수 타입은 boolean입니다.
 */
type InitialStateType = boolean;
export default function useToggle(initialState?: InitialStateType): readonly [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>];
export {};
