import { useEffect, useRef } from 'react';

const useObserveSingle = (callback: () => void) => {
  const observeRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 완전히 들어온 대상만 처리
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            // 콜백 함수 실행 후, 더 이상 관찰하지 않도록 연결 해제
            observer.disconnect();
          }
        });
      },
      { threshold: 1 } // 화면에 완전히 들어온 상태만 감지
    );

    const currentRef = observeRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // 컴포넌트가 언마운트되거나 ref가 변경될 때, observer 연결 해제
    return () => {
      observer.disconnect();
    };
  }, [callback]); // 콜백 함수가 변경되었을 때만 effect를 다시 실행

  return observeRef;
};

export default useObserveSingle;
