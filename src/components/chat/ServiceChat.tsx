import { acceptReservation, rejectReservation } from 'api/reservation'
import { ReservationExtra } from 'interfaces/chat'
import React from 'react'
import { styled } from 'styled-components'

const ServiceChat = ({
  // roomInfo 받아오기
  roomInfo,
  extra,
  who,
  imgUrl,
  title,
  start,
  end,
  content,
}: {
  extra: ReservationExtra
  roomInfo: string
  who: string
  imgUrl: string
  title: string
  start: string
  end: string
  content: string
}) => {
  return (
    <>
      <Conversation $whose={who}>
        <Speech $whose={who}>
          <img src={imgUrl} />
          <SpeechContents>
            <SpeechTitle>{title}</SpeechTitle>
            <SpeechStartEnd>시작일: {start}</SpeechStartEnd>
            <SpeechStartEnd>종료일: {end}</SpeechStartEnd>
            <Speechcontent>{content}</Speechcontent>
            <SpeechBtnWrap>
              {/*  대기상태  */}
              {extra.data.status === 'PENDING' ? (
                <>
                  <SpeechBtn onClick={() => rejectReservation(extra.data.id, roomInfo)}>별로</SpeechBtn>
                  <SpeechBtn onClick={() => acceptReservation(extra.data.id, roomInfo)}>신청</SpeechBtn>
                </>
              ) : // 거절 상태
              extra.data.status === 'REJECTED' ? (
                <>
                  <div style={{ color: 'red' }}>예약을 거절하셨습니다 🥲</div>
                </>
              ) : (
                <div style={{ color: 'blue' }}>예약이 완료되었습니다 😚</div>
              )}
            </SpeechBtnWrap>
          </SpeechContents>
        </Speech>
      </Conversation>
    </>
  )
}

export default ServiceChat

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Conversation = styled.div<{ $whose: string }>`
  /* background-color: #a6f690; */
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: ${({ $whose }) => ($whose == 'me' ? 'flex-end' : 'flex-start')};
`

const Speech = styled.div<{ $whose: string }>`
  background-color: ${(props) => (props.$whose == 'me' ? 'white' : '#f6d690')};
  /* padding: 0.5rem; */
  border-radius: 0.5rem;
  box-sizing: border-box;
  max-width: 20rem;
  word-break: break-all;
  /* background-color: blue; */

  & img {
    width: 13rem;
    height: 13rem;
    border-radius: 7px;
    margin: 0.5rem 0;
  }

  img {
    min-width: 10rem;
    min-height: 10rem;
    margin-bottom: 0.5rem;
    border-radius: 7px;
  }
`

const SpeechContents = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  width: 11.5rem;
`

const SpeechTitle = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`

const SpeechStartEnd = styled.span`
  color: #727070;
  font-size: 0.6rem;
  margin: 0.1rem 0;
`

const Speechcontent = styled.span`
  margin-top: 0.3rem;
  color: #727070;
  font-size: 0.8rem;
`

const SpeechBtnWrap = styled(FlexCenter)`
  justify-content: space-between;
  width: 100%;
  /* background-color: red; */
  margin: 0.8rem 0 0 0;
`

const SpeechBtn = styled.button`
  width: 5rem;
  border: none;
  border-radius: 7px;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #727070;
  background-color: var(--color-original);
  color: white;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ff6021;
  }
`
