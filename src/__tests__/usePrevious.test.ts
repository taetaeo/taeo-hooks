import { renderHook, act } from "@testing-library/react-hooks";
import usePrevious from "../hooks/usePrevious";

describe("usePrevious hook", () => {
  test("초기 값 = undefined", () => {
    // 훅을 렌더링하고 초기 상태를 확인합니다.
    const { result } = renderHook(() => usePrevious(0));

    // 첫 번째 렌더링에서는 이전 값이 없으므로 undefined를 반환해야 합니다.
    expect(result.current).toBeUndefined();
  });

  test("업데이트 시 이전의 값 반환", () => {
    // 훅을 렌더링합니다.
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    // 처음 렌더링 후에는 이전 값이 없으므로 undefined여야 합니다.
    expect(result.current).toBeUndefined();

    // 값을 업데이트하고 훅을 리렌더링합니다.
    rerender({ value: 1 });

    // 리렌더링 후 이전 값이 0이어야 합니다.
    expect(result.current).toBe(0);

    // 값을 다시 업데이트하고 훅을 리렌더링합니다.
    rerender({ value: 2 });

    // 이번에는 이전 값이 1이어야 합니다.
    expect(result.current).toBe(1);
  });
});
