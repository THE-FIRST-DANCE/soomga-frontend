// import { Title } from 'pages/guide/detail'
import { ReactNode } from 'react'
import styled from 'styled-components'

const ScheduleList = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Title></Title>
      <Wrapper>
        <ScrollableContent>{children}</ScrollableContent>
      </Wrapper>
    </>
  )
}

export default ScheduleList

const Title = styled.div`
  min-height: 3rem;
  width: 100%;
  /* background-color: mediumaquamarine; */
`

const Wrapper = styled.div`
  /* background-color: red; */
  width: 25rem;
  height: 25rem;
  border: 1px solid #ddd;
  overflow: auto;
  overflow-wrap: break-word;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  /* margin-top: 3rem; */

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
