import SearchIcon from 'components/icons/Search'
import { styled } from 'styled-components'
import userImg from '../../assets/guideImg.png'
import Star from 'components/icons/Star'
import { useRef, useState } from 'react'
import { MouseEventHandler } from 'react'
import useClickOutsideToggle from 'hooks/useClickOutsideToggle'
import ImageIcon from 'components/icons/ImageIcon'
import PlanIcon from 'components/icons/PlanIcon'
import ServiceIcon from 'components/icons/ServiceIcon'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import FromToIcon from 'components/icons/FromToIcon'
import TimeIcon from 'components/icons/Time'

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

interface ServiceProps {
  serviceName: string
  serviceTitle: string
  startDate: Date
  endDate: Date
}

interface SelectedGuide {
  name: string
  img: string
  content: string
  time: number
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
    name: '박은영',
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
  // 채팅글
  const [inputVal, setInputVal] = useState('')
  console.log('Sending message: ', inputVal)

  // 인풋 ref
  const inputTag = useRef<HTMLInputElement>(null)

  // 모달
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false) // 플랜 모달
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false) // 서비스 모달
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false) // 서비스 제안  모달

  // 플랜 선택 내용
  const [selectePlanInfo, setSelectePlanInfo] = useState({ id: 0, title: '', time: '' })
  console.log('selectePlanInfo: ', selectePlanInfo)

  // 서비스 제안
  const [serviceSuggestion, setserviceSuggestion] = useState<ServiceProps>({
    serviceName: '',
    serviceTitle: '',
    startDate: new Date(),
    endDate: new Date(),
  })
  console.log('serviceSuggestion: ', serviceSuggestion)

  // 시작일
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  // 가이드 검색 입력 값
  const [searchedGuide, setSearchedGuide] = useState('') // 입력 받은 가이드 이름
  const [selectedGuides, setSelectedGuides] = useState<SelectedGuide[]>([]) // 필터링된 가이드 배열

  // 채팅 엔터치면 글 비우기
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputVal.trim()) {
        setInputVal('')
      }
    }
  }

  //  x ,y 좌표 값
  const [mousePosition, setMousePosition] = useState<MouseAxis>({
    xAxis: 0,
    yAxis: 0,
  })

  const [imageFile, setImageFile] = useState<string | null>('') // URL 인코딩된 데이터
  console.log('imageFile: ', imageFile)

  const {
    isOpen: isContextOpen,
    refForToggle: refForLangToggle,
    handleOnClick: handleLangOnClick,
  } = useClickOutsideToggle()

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault() // 기본 우클릭 이벤트를 막기

    // setDropdownOpen((prev) => !prev) // 드롭다운을 열기 위한 상태 업데이트

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
    <>
      {/* 플랜 */}
      {isPlanOpen && (
        <PlanLayout>
          <CancleBtn onClick={() => setIsPlanOpen(false)}>✖</CancleBtn>
          <IconTitle>플랜</IconTitle>
          <PlanWrapper>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <PlanItem
                onClick={() => {
                  // FIXME: 뽑아오는 내용 스테이트에 저장
                  setSelectePlanInfo({
                    id: index,
                    title: '시간',
                    time: '09:00 ~ 10:00',
                  })
                  setIsPlanOpen(false)
                  toast.success(`${index}플랜이 선택되었어요!`)
                }}
              >
                <PlanContent>
                  <Title>{'제목 : '}</Title>
                  <Region>{'지역 : '}</Region>
                  <Region>{'기간 : '}</Region>
                </PlanContent>
                <PlanStyletDiv />
              </PlanItem>
            ))}
          </PlanWrapper>
        </PlanLayout>
      )}
      {/* 서비스 */}
      {isServiceOpen && (
        <ServiceLayout>
          <CancleBtn onClick={() => setIsServiceOpen(false)}>✖</CancleBtn>
          <IconTitle>서비스</IconTitle>
          <PlanWrapper>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <PlanItem
                onClick={() => {
                  setIsSuggestionOpen(true)
                }}
              >
                <PlanContent>
                  <Title
                    onClick={(e) => {
                      // e.stopPropagation() // 이벤트 버블링 중지
                      setserviceSuggestion((prev) => ({
                        ...prev,
                        serviceName: e.target.textContent, // serviceName을 업데이트
                      }))
                    }}
                  >{`${item}타이틀 제목 `}</Title>
                </PlanContent>
                <PlanStyletDiv />
              </PlanItem>
            ))}
          </PlanWrapper>
        </ServiceLayout>
      )}

      {/* 🟡 서비스 제안 🟡 */}
      {isSuggestionOpen && (
        <Suggestionayout>
          <CancleBtn onClick={() => setIsSuggestionOpen(false)}>✖</CancleBtn>
          <PlanWrapper>
            <IconTitle>서비스 제안</IconTitle>

            {/* 제목 */}
            <ItemWrapper>
              <Title>제목</Title>
              <SuggestionInput
                placeholder="제목을 입력하세요.."
                onBlur={(e) => {
                  setserviceSuggestion((prev) => ({
                    ...prev,
                    serviceTitle: e.target.value,
                  }))
                }}
              />
            </ItemWrapper>

            <ItemWrapper>
              <Items>
                <Item>
                  <Title style={{ display: 'flex', alignItems: 'center' }}>
                    시작 시간
                    <TimeIcon $width="25px" $height="25px" $marginLeft="10px" />
                  </Title>
                  <DatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date) => date !== null && setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </Item>
                <FromToIcon style={{ width: '30px', height: '30px', marginTop: '40px' }} />
                <Item>
                  <Title style={{ display: 'flex', alignItems: 'center' }}>
                    종료 시간 <TimeIcon $width="25px" $height="25px" $marginLeft="10px" />
                  </Title>

                  <DatePicker
                    locale={ko}
                    selected={endDate}
                    onChange={(date) => date !== null && setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </Item>
              </Items>

              {/*  FIXME: */}
            </ItemWrapper>
            <SuggestionButton
              onClick={() => {
                setIsSuggestionOpen(false)
                setIsServiceOpen(false)
                // e.stopPropagation() // 이벤트 버블링 중지
                setserviceSuggestion((prev) => ({
                  ...prev,
                  startDate,
                  endDate,
                }))
              }}
            >
              선택
            </SuggestionButton>
          </PlanWrapper>
        </Suggestionayout>
      )}

      {/* 채팅 레이아웃 */}
      <ChatLayout>
        <Content>
          <CancleWrapper>
            {/* <CancleBtn onClick={onClick}>✖</CancleBtn> */}
            <ChatContent>
              <LeftSection>
                <CancleBtn onClick={onClick}>✖</CancleBtn>
                <SearchWrapper>
                  <TopSearchWrap>
                    {/* 🟡 가이드 검색 */}
                    <Input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchedGuide(e.target.value)
                        setSelectedGuides(data.filter((data) => data.name.includes(e.target.value)))
                      }}
                      placeholder="가이드 검색"
                    />
                    <SearchIcon width="30px" height="30px" />
                  </TopSearchWrap>
                </SearchWrapper>
                {/* 현재 대화중인 사람들 */}
                <ChatListWrapper>
                  {(searchedGuide === '' ? data : selectedGuides).map((data, index) => (
                    // {data.map((data, index) => (
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

                      {/* 🟡  플랜 올릴 때 */}
                      <Conversation whose="me">
                        <Speech whose="me">
                          <img src={userImg} />
                          <SpeechContents>
                            <SpeechTitle>{`플랜 제목 ${''}`}</SpeechTitle>
                            <SpeechLocation>지역이름</SpeechLocation>
                            <SpeechStartEnd>4월 17, 2024 2:23 오후</SpeechStartEnd>
                            <SpeechStartEnd>4월 17, 2024 2:23 오후</SpeechStartEnd>
                            <Speechcontent>
                              내가 그의 이름을 불러주기 전에는 그는 다만 하나의 몸짓에 지나지 않았다. 내가 그의 이름을
                              불러주었을 때 그는 나에게로 와서 꽃이 되었다.
                            </Speechcontent>
                            <SpeechBtnWrap>
                              <SpeechBtn>별로</SpeechBtn>
                              <SpeechBtn>신청</SpeechBtn>
                            </SpeechBtnWrap>
                          </SpeechContents>
                        </Speech>
                      </Conversation>

                      {/* 🟡  서비스 올릴 때 */}
                      <Conversation whose="me">
                        <Speech whose="me">
                          <img src={userImg} />
                          <SpeechContents>
                            <SpeechTitle>{`서비스 제목 ${''}`}</SpeechTitle>
                            <SpeechStartEnd>4월 17, 2024 2:23 오후</SpeechStartEnd>
                            <SpeechStartEnd>4월 17, 2024 2:23 오후</SpeechStartEnd>
                            <Speechcontent>
                              내가 그의 이름을 불러주기 전에는 그는 다만 하나의 몸짓에 지나지 않았다. 내가 그의 이름을
                              불러주었을 때 그는 나에게로 와서 꽃이 되었다.
                            </Speechcontent>
                            <SpeechBtnWrap>
                              <SpeechBtn>별로</SpeechBtn>
                              <SpeechBtn>신청</SpeechBtn>
                            </SpeechBtnWrap>
                          </SpeechContents>
                        </Speech>
                      </Conversation>
                    </ConversationWrapper>
                  </Middle>
                  <Bottom>
                    <InputTag
                      ref={inputTag}
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={handleKeyPress} // 키 이벤트 핸들러 추가
                      placeholder="메시지를 입력하세요..."
                    />
                    <IconsContainer>
                      <IconWrapper>
                        {/* 이미지 추가 아이콘  */}
                        <label htmlFor="file-input">
                          <TooltipIcon data-tooltip="사진">
                            <ImageIcon />
                          </TooltipIcon>
                        </label>
                        <ImgInputTag id="file-input" type="file" onChange={handleFileUpload} />

                        {/* 플랜 추가 아이콘 */}
                        <TooltipIcon data-tooltip="플랜">
                          <PlanIcon
                            onClick={() => {
                              setIsPlanOpen(true)
                            }}
                            style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', margin: ' 0 0.5rem' }}
                          />
                        </TooltipIcon>

                        {/* 서비스 추가 아이콘 */}
                        <TooltipIcon data-tooltip="예약">
                          <ServiceIcon
                            onClick={() => {
                              setIsServiceOpen(true)
                            }}
                            style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}
                          />
                        </TooltipIcon>
                      </IconWrapper>
                      <SendBtn
                        disabled={!inputVal.length}
                        $inputVal={inputVal.length > 0 ? true : false}
                        onClick={() => {
                          setInputVal('') // FIXME: 메세지 보내면 대화창 초기화
                          inputTag.current?.focus()
                        }}
                      >
                        보내기
                      </SendBtn>
                    </IconsContainer>
                  </Bottom>
                </RightWrapper>
              </RightSection>
            </ChatContent>
          </CancleWrapper>
        </Content>
      </ChatLayout>
    </>
  )
}

export default Chatting

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

// 채팅 레이아웃
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
  z-index: 6;
  border: 3px;
`
const Content = styled.div`
  width: 70rem;
  height: 40rem;
  background-color: #ffffffe9;
  background: linear-gradient(135deg, #fbdd9c 10%, #fbd2df 100%);
  /* background-color: #ffffffd7; */
  border-radius: 7px;
  padding: 20px;
  position: absolute;
`

const CancleWrapper = styled.div`
  /* background-color: #e5ff00; */
  top: 0;
  right: 0;
  padding: 10px;
`
const CancleBtn = styled(FlexCenter)`
  cursor: pointer;
  width: 20px;
  margin-bottom: 1rem;
  transition: all 0.2s;
  &:hover {
    color: var(--color-original);
  }
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
  background-color: #ffffff84;
  z-index: 300;
  border-radius: 7px;

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
      border-radius: 0.2rem;
    }
  }
`

const LeftSection = styled.div`
  /* background-color: royalblue; */
  /* border-right: 2px solid #97979651; */
  flex: 1;
`

// const TopSearchWrap = styled.div`
const TopSearchWrap = styled(FlexCenter)`
  margin-bottom: 0.5rem;
  justify-content: flex-start;
  background-color: white;
  border-radius: 7px;
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
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* 스크롤바 트랙 */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
  }

  /* 스크롤바 */
  &::-webkit-scrollbar-thumb {
    background: #dbdad9bf;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
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
  /* background-color: #f0f0f0; */
  cursor: pointer;
`

const Left = styled(FlexCenter)`
  /* background-color: tomato; */
  height: 4rem;
  justify-content: center;
  gap: 1rem;
  margin-right: 0.5rem;
`

const ImgWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-left: 1rem;
  margin-right: 1rem;
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
  /* margin-right: 3rem; */
  padding: 0ㄹ5rem;
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
  margin-bottom: 0.5rem;
`

const TopWrapper = styled(FlexCenter)`
  width: 100%;
  flex-direction: column;
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
  /* background-color: #ee68c1; */
  border-radius: 1rem 0 0 0;
  width: 100%;
`
const ConversationWrapper = styled.div`
  width: 100%;
  height: 28rem;
  overflow: auto;

  /* background-color: #e6e2db; */
  /* background-color: #f8efec; */
  /* background-image: linear-gradient(to bottom, #ffffff79 0%, #f8efec 50%, #d6c1b294 100%); */

  /* 스크롤바 넓이 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* 스크롤바 트랙 */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
  }

  /* 스크롤바 */
  &::-webkit-scrollbar-thumb {
    background: #dbdad9bf;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

// 채팅 틀
const Conversation = styled.div<WhoseChat>`
  /* background-color: #a6f690; */
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: ${({ whose }) => (whose == 'me' ? 'flex-end' : 'flex-start')};
`

// 채팅 풍선
const Speech = styled.div<WhoseChat>`
  background-color: ${({ whose }) => (whose == 'me' ? 'white' : '#f6d690')};
  padding: 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  max-width: 20rem;
  word-break: break-all;

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
  width: 10rem;
`

const SpeechTitle = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`
const SpeechLocation = styled.span`
  color: #727070;
  font-size: 0.7rem;
  margin: 0.3rem 0;
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
  margin: 0.8rem 0 0 0;
`

const SpeechBtn = styled.button`
  width: 4.5rem;
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

const Bottom = styled(FlexCenter)`
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
  flex-direction: column;
`

const IconsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  box-sizing: border-box;
  /* background-color: #eee768; */
`
const IconWrapper = styled(FlexCenter)`
  gap: 0.5rem;
  /* background-color: yellow; */
  /* cursor: pointer; */
`

const InputTag = styled.textarea`
  /* background-color: #eee768; */
  width: 100%;
  height: 3.3rem;
  border: none;
  padding: 0.7rem;
  box-sizing: border-box;
  outline: none;
  resize: none;
`

const SendBtn = styled.button<{ $inputVal: boolean }>`
  width: 3rem;
  height: 1.5rem;
  border: none;
  transition: all 0.3s ease;
  border-radius: 0.2rem;
  background-color: ${(props) => (props.$inputVal ? 'var(--color-original)' : 'white')};
  color: ${(props) => (props.$inputVal ? 'white' : 'var(--color-original)')};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$inputVal ? '#ff6021' : 'white')};
  }
`
const ImgInputTag = styled.input`
  display: none;
`

// ----------------------------------------

const PlanLayout = styled.div`
  width: 30rem;
  height: 35rem;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  /* background: rgba(0, 0, 0, 0.5); */
  box-shadow: 2px 2px 4px #a2a1a1;
  background: #f3f5f6;
  z-index: 7; // ChattingLayout = 6
  border-radius: 10px;
`
const ServiceLayout = styled(PlanLayout)``

const PlanWrapper = styled(FlexCenter)`
  height: 82%;
  overflow: auto;
  /* background-color: red; */
  flex-direction: column;
  justify-content: flex-start;

  /* 스크롤바 막대 꾸미기 */
  &::-webkit-scrollbar-thumb {
    background-color: #c6c0c0;
    border-radius: 2rem;
  }

  /* 스크롤바 트랙 꾸미기 */
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
  }

  // datepicker__input
  .react-datepicker__input-container input {
    width: 11.5rem;
    font-size: 1.1rem;
    /* border: 1px solid #ddd; */
    border: 2px solid var(--color-original);
    border-radius: 12px;
    padding: 0.5rem 1rem;
  }

  .react-datepicker__header {
    background-color: #fffefb;
  }
  .react-datepicker__day-name:first-child {
    color: red;
  }
  .react-datepicker__day-name:last-child {
    color: blue;
  }
`

const IconTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 2rem 0;
  text-align: center;
`

const PlanItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  background-color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px #a2a1a1;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 2px 2px 8px #a2a1a1;
  }
  /* border: 1px solid black; */
`

const PlanContent = styled.div`
  /* width: 100%; */
  padding: 1rem;
  box-sizing: border-box;
  /* border-bottom: 1px solid #f2f2f2; */
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Region = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`
const PlanStyletDiv = styled.div`
  background-color: var(--color-original);
  width: 100%;
  padding: 5px;
  margin-top: -1rem;
  box-sizing: border-box;
  overflow-y: auto;
`

const TooltipIcon = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  // 툴팁 텍스트 스타일
  &::after {
    content: attr(data-tooltip);
    font-size: 0.5rem;
    position: absolute;
    width: 30px;
    background-color: #dbdbdb61;
    color: #000000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    z-index: 1;
    transition:
      opacity 0.3s,
      visibility 0.3s;
  }

  // 마우스 호버 시 툴팁 보이기
  &:hover::after,
  &:hover::before {
    visibility: visible;
    opacity: 1;
  }
`

const Suggestionayout = styled(PlanLayout)`
  background: linear-gradient(135deg, #fbdd9c 10%, #fbd2df 100%);
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
  color: 5a5a5a;
`

const ItemWrapper = styled.div`
  /* background-color: mediumaquamarine; */
  width: 100%;
  margin-bottom: 5rem;
`

const Items = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
`
const Item = styled.div``

const SuggestionInput = styled.input`
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  width: 100%;
  align-self: stretch;
  border-radius: 12px;
  border: 2px solid var(--color-original);
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`

const SuggestionButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  align-self: stretch;
  border-radius: 12px;
  color: white;
  background-color: var(--color-original);
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ff6021;
  }
`
