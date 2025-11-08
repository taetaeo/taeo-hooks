import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import useToggle from "../hooks/useToggle";

// 초기값 true
test("initial value as true", () => {
  const { result } = renderHook(() => useToggle(true));

  // Initially, the value should be true
  expect(result.current.value).toBe(true);

  // Toggle the value to false
  act(() => {
    result.current.toggle();
  });
  expect(result.current.value).toBe(false);

  // Toggle the value back to true
  act(() => {
    result.current.toggle();
  });
  expect(result.current.value).toBe(true);
});

// 초기값 false
test("initial value as false", () => {
  const { result } = renderHook(() => useToggle(false));

  // Initially, the value should be true
  expect(result.current.value).toBe(false);

  // Toggle the value to false
  act(() => {
    result.current.toggle();
  });
  expect(result.current.value).toBe(true);

  // Toggle the value back to true
  act(() => {
    result.current.toggle();
  });
  expect(result.current.value).toBe(false);
});

test("setToggle method", () => {
  const { result } = renderHook(() => useToggle());

  // Initially, the value should be false
  expect(result.current.value).toBe(false);

  // Set the value to true using setToggle
  act(() => {
    result.current.setToggle(true);
  });
  expect(result.current.value).toBe(true);

  // Set the value back to false using setToggle
  act(() => {
    result.current.setToggle(false);
  });
  expect(result.current.value).toBe(false);
});
