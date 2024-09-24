import { useEffect, useRef } from "react";

/**
 * @description 이 훅은 컴포넌트에서 이전 상태 또는 값을 추적하기 위해 사용됩니다.
 * 이는 현재의 렌더링과 이전의 렌더링의 값을 비교하여, 
 * 이전 렌더링에서의 값을 기억해두어야 하는 경우에 사용합니다.
 *
 * @param value - 추적하고자 하는 현재 값입니다.
 * @see [document]('https://gist.github.com/kwoncharles/e7652706e740a118d75b8b17a95df58f#file-useprevious-ts')
 * @returns 전달받은 값의 이전 값을 반환합니다.
 * @example
    function Example() {
        const [exam, set] = useState('A');
        const prevExam = usePrevious(exam);
  
        useEffect(() => {
            if (exam === 'C' && prevExam === 'B') {
            doSomething();
            }
        }, [exam]);
    }
 * 
 */

export function usePrevious(value) {
  // useRef를 사용하여 이전 값을 저장할 ref 객체를 생성합니다.
  const ref = useRef();

  // 값이 변경될 때마다 useEffect가 실행되어 ref.current에 최신 값을 저장합니다.
  useEffect(() => {
    ref.current = value; // 현재 값을 ref에 저장
  }, [value]); // value가 변경될 때마다 실행

  // ref.current에는 이전 값이 저장되어 있으므로 이를 반환합니다.
  return ref.current;
}
