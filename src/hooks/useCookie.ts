import { useCallback, useState } from "react";
import Cookies from "js-cookie";

/**
 * 쿠키를 관리하기 위한 커스텀 React 훅입니다.
 *
 * @param {string} cookieKey - 쿠키의 키 또는 이름입니다.
 * @returns {UseCookieReturnType} 현재 쿠키 값, 쿠키를 업데이트하는 함수, 쿠키를 삭제하는 함수를 담은 배열을 반환합니다.
 */
export type UseCookieReturnType = ReturnType<typeof useCookie>;

export function useCookie(cookieKey: string) {
  // 쿠키의 현재 값 보관을 위한 상태 변수
  const [cookie, setCookie] = useState<string | null>(() => Cookies.get(cookieKey) || null);

  /**
   * @event UPDATE
   * 쿠키를 새 값으로 업데이트하는 함수입니다.
   *
   * @param {string} newValue - 쿠키에 설정할 새 값입니다.
   * @param {Cookies.CookieAttributes} options - 쿠키에 대한 선택적 설정입니다.
   */
  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieKey, newValue, options);
      setCookie(newValue);
    },
    [cookieKey]
  );

  /**
   * @event DELETE
   * 쿠키를 삭제하는 함수입니다.
   */
  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieKey);
    setCookie(null);
  }, [cookieKey]);

  // 현재 값, 업데이트 함수, 삭제 함수를 담은 객체를 반환합니다.
  return { cookie, updateCookie, deleteCookie };
}
