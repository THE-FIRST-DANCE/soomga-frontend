import styled from 'styled-components'
import chatBtn from 'assets/chatBtn.svg'
import { useNavigate } from 'react-router-dom'
const ChatButton = () => {
  let navigate = useNavigate()
  return (
    /* 우측 하단 채팅 바로가기 버튼 */
    <ChatBtnWrapper onClick={() => navigate('/chatting')}>
      <img src={chatBtn} alt="" />
    </ChatBtnWrapper>
  )
}

export default ChatButton
/* ----------------------------- 💅 StyledComponent -----------------------------*/
const ChatBtnWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 120px;
  height: 120px;
  z-index: 999;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`
