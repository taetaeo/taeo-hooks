import React from "react";

/** 매개변수로 넣어줄 타입 */
interface ICopyClipboardProps {
  successMsg?: string;
  errorMsg?: string;
}

/** 훅의 결과에 대한 타입 */
interface ICopyClipboardResult {
  isCopy: boolean;
  handleCopy: (text: string) => Promise<boolean>;
  error: string | null;
  resetError: () => void;
}

/**
 * 이 훅은 클립보드의 내용을 복사하는 기능을 제공하는 커스텀 훅입니다.
 * @param {Object} options - 옵션 객체
 * @param {string} options.successMsg - 복사 성공 시 표시할 메시지 (기본값: "복사하였습니다.")
 * @param {string} options.errorMsg - 복사 실패 시 표시할 메시지 (기본값: "복사가 실패하였습니다.")
 * @returns {Object} - isCopy, handleCopy, error, resetError를 제공하는 객체
 */
export default function useCopyClipBoard({ successMsg = "복사하였습니다.", errorMsg = "복사가 실패하였습니다." }: ICopyClipboardProps): ICopyClipboardResult {
  const [isCopy, setIsCopy] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCopy = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      setError(null);
      alert(successMsg);
      return true;
    } catch (err) {
      console.error(err);
      setIsCopy(false);
      setError(errorMsg);
      return false;
    }
  };

  const resetError = () => setError(null);

  return { isCopy, handleCopy, error, resetError };
}
