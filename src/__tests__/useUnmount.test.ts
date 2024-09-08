import { renderHook } from "@testing-library/react-hooks";
import useUnmount from "../hooks/useUnmount";

test("useUnmount hook should call the cleanup function on unmount", () => {
  const cleanupFunction = jest.fn(); // Mock function to track cleanup

  // Render the hook
  const { unmount } = renderHook(() => useUnmount(cleanupFunction));

  // Ensure that the cleanup function hasn't been called yet
  expect(cleanupFunction).not.toHaveBeenCalled();

  // Unmount the component
  unmount();

  // Ensure the cleanup function is called on unmount
  expect(cleanupFunction).toHaveBeenCalledTimes(1);
});
