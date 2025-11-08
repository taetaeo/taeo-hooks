import { useState, useEffect } from "react";

export interface ReturnFetch<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface FetchOptions extends RequestInit {
  // 추가 옵션
}

export const useFetch = <T>(url: string, options?: FetchOptions): ReturnFetch<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: "get",
          ...options,
          headers: {
            ...options?.headers,
          },

          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err as Error);
        } else {
          setError(new Error("Something went wrong"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error };
};
