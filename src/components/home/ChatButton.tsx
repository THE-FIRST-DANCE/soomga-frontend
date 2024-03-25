import styled from 'styled-components'
import chatBtn from 'assets/chatBtn.svg'

interface ChatButtonProps {
  onClick: () => void
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    /* 우측 하단 채팅 바로가기 버튼 */
    <ChatBtnWrapper onClick={onClick}>
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
  width: 3rem;
  height: 3rem;
  z-index: 999;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`
