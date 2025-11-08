import { renderHook, act } from "@testing-library/react-hooks";
import Cookies from "js-cookie";
import useCookie from "../hooks/useCookie";

// js-cookie 메서드를 모킹합니다.
jest.mock("js-cookie");

describe("useCookie hook", () => {
  const cookieKey = "testCookie";

  beforeEach(() => {
    // 각 테스트 전에 모킹을 초기화합니다.
    jest.clearAllMocks();
  });

  test("초기 쿠키 값 = null", () => {
    // Cookies.get에서 반환되는 쿠키 값을 모킹합니다.
    Cookies.get(cookieKey);

    // 훅을 렌더링합니다.
    const { result } = renderHook(() => useCookie(cookieKey));

    // 초기 쿠키 값이 올바르게 설정되었는지 확인합니다.
    expect(result.current.cookie).toBe(null);
  });

  test("updateCookie 호출시, 쿠키와 상태를 업데이트", () => {
    // 훅을 렌더링합니다.
    const { result } = renderHook(() => useCookie(cookieKey));

    // act: updateCookie 함수를 호출합니다.
    act(() => {
      result.current.updateCookie("newValue", { expires: 7 });
    });

    // Cookies.set을 사용하여 쿠키가 업데이트되었는지 확인합니다.
    expect(Cookies.set).toHaveBeenCalledWith(cookieKey, "newValue", { expires: 7 });

    // 쿠키 상태가 업데이트되었는지 확인합니다.
    expect(result.current.cookie).toBe("newValue");
  });

  test("deleteCookie 호출시, 쿠키 값 제거 및 상태가 null로 갱신", () => {
    // 훅을 렌더링합니다.
    const { result } = renderHook(() => useCookie(cookieKey));

    // act: deleteCookie 함수를 호출합니다.
    act(() => {
      result.current.deleteCookie();
    });

    // Cookies.remove를 사용하여 쿠키가 제거되었는지 확인합니다.
    expect(Cookies.remove).toHaveBeenCalledWith(cookieKey);

    // 쿠키 상태가 null로 설정되었는지 확인합니다.
    expect(result.current.cookie).toBeNull();
  });
});
