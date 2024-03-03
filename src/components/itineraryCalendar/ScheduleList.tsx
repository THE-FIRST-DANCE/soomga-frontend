import { ReactNode } from 'react'
import styled from 'styled-components'

const ScheduleList = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <ScrollableContent>{children}</ScrollableContent>
    </Wrapper>
  )
}

export default ScheduleList

const Wrapper = styled.div`
  width: 70%;
  height: 42rem;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 3rem;

  overflow: hidden;
  padding: 2rem 0;
  padding-left: 2rem;
  box-sizing: border-box;
`

const ScrollableContent = styled.div`
  overflow: auto;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;

  /* Scrollbar 스타일 지정 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #6b6b6b;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`
