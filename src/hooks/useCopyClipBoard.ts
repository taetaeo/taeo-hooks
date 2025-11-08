import { useCallback, useState } from "react";

/**
 * @description Props 타입
 */
export interface UseCopyClipboardProps {
  successMsg?: string;
  errorMsg?: string;
}

/**
 * @description Return 타입
 */
export interface UseCopyClipboard {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
}

/**
 * 이 훅은 클립보드의 내용을 복사하는 기능을 제공하는 커스텀 훅입니다.
 * @param {Object} options - 옵션 객체
 * @param {string} options.successMsg - 복사 성공 시 표시할 메시지 (기본값: "복사하였습니다.")
 * @param {string} options.errorMsg - 복사 실패 시 표시할 메시지 (기본값: "복사가 실패하였습니다.")
 * @returns {Object} - isCopy, handleCopy, error, resetError를 제공하는 객체
 * @documents https://taeo.gitbook.io/taeo/taeo-hooks/usecopyclipboard
 */
export function useCopyClipBoard(): UseCopyClipboard {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return { copiedText, copy };
}
