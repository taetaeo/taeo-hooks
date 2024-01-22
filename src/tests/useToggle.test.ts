import { act, renderHook } from "@testing-library/react-hooks";
import useToggle from "../useToggle";

describe("useToggle", () => {
  test("useToggle은 길이가 3인 배열을 리턴한다. (state, onToggle, setState)", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current).toHaveLength(3);
  });

  test("매개변수로 initialState 값을 입력하지 않으면 기본 state 값은 false로 설정된다.", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  test("매개변수로 initialState 값을 입력하면 state에 그 값이 설정 된다.", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  test("onToggle 함수를 이용해서 state 값을 toggle 시킬 수 있다.", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  test("setState 함수를 이용해서 직접 state 값을 변경할 수 있다.", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true);
    });

    expect(result.current[0]).toBe(true);
  });
});
