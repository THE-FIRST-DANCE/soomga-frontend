import SearchIcon from 'components/icons/Search'
import { styled } from 'styled-components'
import userImg from '../../assets/guideImg.png'
import Star from 'components/icons/Star'
import { useState } from 'react'
import { MouseEventHandler } from 'react'
import useClickOutsideToggle from 'hooks/useClickOutsideToggle'
import Plus from 'components/icons/Plus'
import ImageIcon from 'components/icons/ImageIcon'

interface ChatButtonProps {
  onClick: () => void
}

interface MouseAxis {
  xAxis: number
  yAxis: number
}
interface WhoseChat {
  whose: string
}

let data = [
  {
    name: '최희지',
    img: userImg,
    content: '가나다라마바weiddhfergergergergdadwddgrgergergef',
    time: 1,
  },
  {
    name: '이다슬',
    img: userImg,
    content: 'dsasdjnv.jknasdkvjnalksdhnvkljashvlasdlvhsiudhvliusf ',
    time: 1,
  },
  {
    name: '배수현',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
  {
    name: '김지수',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
  {
    name: '정유미',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
  {
    name: '신예림',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
  {
    name: '서수희',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
  {
    name: '임세림',
    img: userImg,
    content: '가나다라마바 ',
    time: 1,
  },
]

const Chatting = ({ onClick }: ChatButtonProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)

  //  x ,y 좌표 값
  const [mousePosition, setMousePosition] = useState<MouseAxis>({
    xAxis: 0,
    yAxis: 0,
  })

  const [imageFile, setImageFile] = useState<string | null>('') // URL 인코딩된 데이터

  const {
    isOpen: isContextOpen,
    refForToggle: refForLangToggle,
    handleOnClick: handleLangOnClick,
  } = useClickOutsideToggle()

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault() // 기본 우클릭 이벤트를 막기

    setDropdownOpen((prev) => !prev) // 드롭다운을 열기 위한 상태 업데이트

    setMousePosition({
      xAxis: e.clientX,
      yAxis: e.clientY,
    })

    handleLangOnClick()
  }

  /* 이미지 올리기 */
  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e
    const file = files?.[0]

    const fileReader = new FileReader()

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget
      setImageFile(result) // 이미지 파일의 URL을 상태로 설정
    }

    if (file) {
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <ChatLayout>
      <Content>
        <CancleWrapper>
          {/* <CancleBtn onClick={onClick}>✖</CancleBtn> */}
          <ChatContent>
            <LeftSection>
              <CancleBtn onClick={onClick}>✖</CancleBtn>
              <SearchWrapper>
                <TopSearchWrap>
                  <Input placeholder="가이드 검색" />
                  <SearchIcon width="30px" height="30px" />
                </TopSearchWrap>
              </SearchWrapper>
              {/* 현재 대화중인 사람들 */}
              <ChatListWrapper>
                {data.map((data, index) => (
                  <GuideWrapper onContextMenu={handleContextMenu}>
                    {/* 만약 우측 버튼을 누른다면 ContextMenu를 보여줘라 */}
                    {isContextOpen && (
                      <ContextMenu ref={refForLangToggle} {...mousePosition}>
                        <ul>
                          <li>채팅방 열기</li>
                          <li style={{ borderTop: '1px solid #93939363', borderBottom: '1px solid #93939363' }}>
                            즐겨 찾기
                          </li>
                          <li>채팅방 나가기</li>
                        </ul>
                      </ContextMenu>
                    )}
                    <Left>
                      {/* 왼쪽 이미지 */}
                      <ImgWrapper>
                        <img src={userImg} alt="nmo" />
                      </ImgWrapper>
                    </Left>
                    {/* 오른쪽 대화 내용 이름 */}
                    <Right>
                      <ChatCard>
                        <ContentWrapper>
                          <GuideName>{data.name}</GuideName>
                          {false && <Star $width="30px" $height="30px" $color="yellow" />}
                        </ContentWrapper>
                        <ContentWrapper>
                          <PreviewContent>
                            {data.content.length > 14 && (
                              <PreviewContent>{data.content.substring(0, 13) + '...'}</PreviewContent>
                            )}
                            {data.content.length <= 14 && <PreviewContent>{data.content}</PreviewContent>}
                          </PreviewContent>
                          ・<Time>{`${2} 시간전`}</Time>
                        </ContentWrapper>
                      </ChatCard>
                    </Right>
                  </GuideWrapper>
                ))}
              </ChatListWrapper>
            </LeftSection>
            {/* 오른쪽 색션 */}
            <RightSection>
              <RightWrapper>
                <Top>
                  <TopWrapper>
                    <Image>
                      <img src={userImg} alt="NoImg" />
                    </Image>
                    <GuideName>최희지</GuideName>
                  </TopWrapper>
                </Top>
                <Middle>
                  <ConversationWrapper>
                    {/* 대화 내용 */}
                    <Conversation whose="guide">
                      <Speech whose="guide">가이드의 톡 내용</Speech>
                    </Conversation>
                    <Conversation whose="guide">
                      <Speech whose="guide">가이드의 톡 내용</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                    <Conversation whose="guide">
                      <Speech whose="guide">가이드의 톡 내용</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                    <Conversation whose="me">
                      <Speech whose="me">내가 지금 작성하고 있는 글이야</Speech>
                    </Conversation>
                  </ConversationWrapper>
                </Middle>
                <Bottom>
                  <label htmlFor="file-input">
                    <ImageIcon />
                  </label>
                  <ImgInputTag id="file-input" type="file" onChange={handleFileUpload} />
                  <InputTag />
                  <SendBtn>보내기</SendBtn>
                </Bottom>
              </RightWrapper>
            </RightSection>
          </ChatContent>
        </CancleWrapper>
      </Content>
    </ChatLayout>
  )
}

export default Chatting

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChatLayout = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  border: 3px;
`
const Content = styled.div`
  width: 70rem;
  height: 40rem;
  background-color: #ffffffd7;
  border-radius: 10px;
  padding: 20px;
  position: absolute;
`

const CancleWrapper = styled.div`
  /* background-color: #e5ff00; */
  /* position: relative; */
  top: 0;
  right: 0;
  padding: 10px;
`
const CancleBtn = styled(FlexCenter)`
  cursor: pointer;
  /* background-color: red; */
  width: 20px;
  margin-bottom: 1rem;
`
const ChatContent = styled.div`
  /* background-color: #00ffb7; */
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 37rem;
`
const ContextMenu = styled.div<MouseAxis>`
  position: fixed;
  top: ${({ yAxis }) => yAxis}px;
  left: ${({ xAxis }) => xAxis}px;
  background-color: #ffffffc7;
  z-index: 300;
  border-radius: 0.3rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: #97979651;
      border-radius: 0.3rem;
    }
  }
`

const LeftSection = styled.div`
  /* background-color: royalblue; */
  border-right: 2px solid #97979651;
  flex: 1;
`

// const TopSearchWrap = styled.div`
const TopSearchWrap = styled(FlexCenter)`
  margin-bottom: 0.5rem;
  justify-content: flex-start;
  background-color: white;
`

const SearchWrapper = styled(FlexCenter)`
  /* margin: auto; */
  width: 100%;
  justify-content: flex-start;
  /* background-color: #727070; */
  /* gap: 0.5rem; */
`
const Input = styled.input`
  width: 22rem;
  height: 2rem;
  border: none;
  outline: none;
  margin: 0 0.5rem;
  box-sizing: border-box;
  /* background-color: red; */
`

const ChatListWrapper = styled.div`
  overflow: auto;
  /* background-color: mediumaquamarine; */
  width: 100%;
  height: 35rem;
  border-radius: 0.5rem;
  /* 스크롤바 막대 꾸미기 */
  &::-webkit-scrollbar-thumb {
    background-color: #c6c0c0;
    border-radius: 2rem;
  }

  /* 스크롤바 트랙 꾸미기 */
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
  }
`

/* 가이드 레퍼  */
const GuideWrapper = styled(FlexCenter)`
  width: 100%;
  height: auto;
  justify-content: flex-start;
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  background-color: #f0f0f0;
  cursor: pointer;
`

const Left = styled(FlexCenter)`
  /* background-color: tomato; */
  height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 0.5rem;
`

const ImgWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-left: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`

const Right = styled.div`
  /* background-color: burlywood; */
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`
const ChatCard = styled.div``

const GuideName = styled.div`
  font-size: 1.3rem;
  text-align: center;
  padding: 0.5rem 0;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PreviewContent = styled.div`
  /* background-color: #c8ff00; */
  max-width: 100%;
  margin-right: 0.5rem;
`
const Time = styled.div`
  font-size: 0.8rem;
  color: gray;
  width: 4 rem;
`

// 오른쪽
const RightSection = styled.div`
  /* background-color: tomato; */
  flex: 1.9;
`
const RightWrapper = styled.div`
  position: relative;
  top: -1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
const Top = styled.div`
  /* background-color: #e6e2db; */
  /* background-color: mediumaquamarine; */
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const TopWrapper = styled(FlexCenter)`
  width: 100%;
  margin-top: 1rem;
`

const Image = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`
const Middle = styled.div`
  background-color: #e6e2db;
  border-radius: 1rem 0 0 0;
  width: 100%;
`
const ConversationWrapper = styled.div`
  /* background-color: #ee68c1; */
  width: 100%;
  height: 30rem;
  overflow: auto;
`
// const Conversation = styled(FlexCenter)<WhoseChat>`
const Conversation = styled.div<WhoseChat>`
  /* background-color: #a6f690; */
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: ${({ whose }) => (whose == 'me' ? 'flex-end' : 'flex-start')};
`

const Speech = styled.div<WhoseChat>`
  background-color: ${({ whose }) => (whose == 'me' ? 'white' : '#f6d690')};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  max-width: 20rem;
  word-break: break-all;
`

const Bottom = styled(FlexCenter)`
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
`
const InputTag = styled.input`
  /* background-color: #eee768; */
  width: 85%;
  height: 3rem;
  border: none;
  /* background-color: transparent; */
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  outline: none;
  resize: none;
`

const SendBtn = styled.button`
  width: 3rem;
  height: 1.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: var(--color-original);
  color: white;
  cursor: pointer;
`
const ImgInputTag = styled.input`
  display: none;
`
