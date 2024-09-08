import { renderHook } from "@testing-library/react-hooks";
import useUnmount from "../hooks/useUnmount";

test("This hook should call the cleanup function on unmount.", () => {
  const cleanupFunction = jest.fn(); // 클린업을 추적하기 위한 Mocking 함수

  // 훅을 랜더링
  const { unmount } = renderHook(() => useUnmount(cleanupFunction));

  // 컴포넌트가 언마운트되기 전에는 클린업 함수가 호출되지 않았는지 확인
  expect(cleanupFunction).not.toHaveBeenCalled();

  // 컴포넌트를 언마운트
  unmount();

  // 언마운트 시 클린업 함수가 한 번 호출되었는지 확인
  expect(cleanupFunction).toHaveBeenCalledTimes(1);
});
