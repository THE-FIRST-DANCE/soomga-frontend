import { useEffect, useRef } from 'react'

/* 
  callback : 콜백 함수 실행: 대상 요소가 뷰포트에 완전히 들어온 것을 감지하면, 
  제공된 콜백 함수(callback())를 실행합니다. 이는 예를 들어, 
  요소가 화면에 완전히 보일 때 특정 액션을 실행하고자 할 때 유용합니다.
*/
const useObserver = (callback: () => void) => {
  const observeRef = useRef(null) //참조 생성

  useEffect(() => {
    /* IntersectionObserver => observer.observe(currentRef) */
    const observer = new IntersectionObserver( // 🟡2. 객체를 인식하면 동작
      // entries: 현재 감시중인 모든 놈이 담겨 있다.
      (entries) => {
        // 화면에 완전히 들어온 대상만 처리
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 화면에 보일 때만 실행
            callback()
            // 연결 해제: 콜백 함수가 실행된 후 더 이상 요소를 관찰할 필요가 없으면, observer.disconnect()를 호출하여 관찰자(observer)와 대상 요소 간의 연결을 해제
            observer.disconnect()
          }
        })
      },
      { threshold: 1 }, // 뷰포트에 완전히 들어올 때(즉, 100% 교차할 때) 교차 상태를 감지
    )

    const currentRef = observeRef.current
    if (currentRef) {
      observer.observe(currentRef) // 🟡 1. 인지하는 객체  -> 관측자가 어떤 객체를 인식
    }

    // 컴포넌트가 언마운트되거나 ref가 변경될 때, observer 연결 해제
    return () => {
      observer.disconnect()
    }
  }, [callback]) // 콜백 함수가 변경되었을 때만 effect를 다시 실행

  return observeRef
}

export default useObserver
