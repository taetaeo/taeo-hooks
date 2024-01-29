import { useEffect, useState } from "react";

/**
 * 타이머 기능을 하는 커스텀 훅
 * @param {number} initialTime - 타이머의 초기 시간(초)입니다.
 * @returns {number} - 현재 시간
 */

export default function useTimer(initialTime: number): number {
  const [time, setTime] = useState(initialTime); // 현재 시간에 대한 상태관리

  useEffect(() => {
    // 유효한 숫자인지 체크
    if (isNaN(initialTime) || initialTime < 0) {
      console.error("잘못된 initialTime입니다. 음수가 아닌 숫자를 제공해주세요.");
      return;
    }

    // 타이머
    const timer = setInterval(() => {
      setTime((prevTime: number) => prevTime + 1);
    }, 1000);

    // 언마운트시에 interval 클리어
    return () => clearInterval(timer);
  }, [initialTime]);

  return time;
}
