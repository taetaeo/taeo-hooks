import { renderHook, act } from "@testing-library/react-hooks";
import useFetch from "../hooks/useFetch";

describe("useFetch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch data successfully", async () => {
    const mockData = { name: "John Doe" };

    // fetch를 모킹하여 성공적인 응답을 반환하도록 설정
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useFetch<{ name: string }>("https://api.example.com/user"));

    // 초기 상태 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // 데이터 업데이트를 기다림
    await waitForNextUpdate();

    // 성공적으로 데이터를 가져온 후 상태 확인
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test("should handle fetch error", async () => {
    // fetch를 모킹하여 실패하는 응답을 반환하도록 설정
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useFetch<{ name: string }>("https://api.example.com/user"));

    // 초기 상태 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // 에러 발생 후 상태 업데이트를 기다림
    await waitForNextUpdate();

    // 에러 상태 확인
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe("Error: Not Found");
  });
});
