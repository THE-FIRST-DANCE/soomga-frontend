import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const ComputerWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 2rem auto;
  perspective: 1000px;
`

const Computer = styled.div`
  width: 100%;
  padding-top: 62.5%; // 16:10 aspect ratio
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(10deg) rotateY(0deg);
  transition: transform 0.5s ease;

  &:hover {
    transform: rotateX(0deg) rotateY(0deg);
  }
`

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 7%;
  background: #000;
  border-radius: 10px 10px 0 0;
  padding: 2%;
  overflow: hidden;
`

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
`

const Video = styled.video`
  width: 100%; // 너비를 100%로 설정
  height: auto; // 높이를 자동으로 설정하여 비율 유지
  max-height: 100%; // 최대 높이를 100%로 설정
  object-fit: fill; // 비율에 맞춰 꽉 차게 맞춤
`

const Base = styled.div`
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 7%;
  background: #888;
  border-radius: 0 0 20px 20px;
`

const ServicePreview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Auto-play was prevented:', error)
      })
    }
  }, [])

  return (
    <ComputerWrapper>
      <Computer>
        <Screen>
          <VideoContainer>
            <Video ref={videoRef} autoPlay muted loop playsInline aria-label="Soomga 서비스 시연 영상">
              <source src="/soomga_planing.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
          </VideoContainer>
        </Screen>
        <Base />
      </Computer>
    </ComputerWrapper>
  )
}

export default ServicePreview
