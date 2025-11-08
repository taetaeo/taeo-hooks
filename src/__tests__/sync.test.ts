import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

describe("동기 훅 vs 비동기 훅 테스트", () => {
  it("useState를 테스트합니다", () => {
    // Hook을 렌더링
    const { result } = renderHook(() => React.useState<number>(1));

    // console.log로 현재 값을 출력
    console.log("초기값", result.current[0]); // 1이 출력됩니다.

    // 상태 값이 1인지 확인
    expect(result.current[0]).toBe(1);

    // act를 사용하여 상태를 업데이트
    act(() => {
      result.current[1](result.current[0] + 1); // setState를 호출하여 값을 2로 업데이트
    });

    console.log("업데이트", result.current[0]); // 1이 출력됩니다.

    // 상태 값이 2로 업데이트되었는지 확인
    expect(result.current[0]).toBe(2);
  });
});
