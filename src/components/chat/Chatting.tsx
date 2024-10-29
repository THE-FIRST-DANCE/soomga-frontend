import SearchIcon from 'components/icons/Search'
import { styled } from 'styled-components'
import userImg from '../../assets/guideImg.png'
import defaultAvatar from 'assets/default_avatar.webp'
import Star from 'components/icons/Star'
import { LegacyRef, useEffect, useRef, useState } from 'react'
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
import { useChat } from 'hooks/Chat/useChat'
// import { Message, MouseAxis, Room, ServiceProps } from '../..hat'
import { Message, MouseAxis, Plan, Room, ServiceProps } from '../../interfaces/chat'
import { useRecoilState } from 'recoil'
import { ChatList } from 'state/store/ChatList'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import useObserveSingle from 'hooks/Chat/useObserveSingle'
import PlanChat from './PlanChat'
import ServiceChat from './ServiceChat'
import { IsClickAtMain } from 'state/store/IsClickAtMain'
import logo from 'assets/logo.svg'
import { ReservationPayload, createReservation, getServices } from 'api/ServiceAPI'
import dayjs from 'dayjs'
import useLanguage from 'hooks/useLanguage'
import { getPlanList } from 'api/PlanAPI'

const messagesL = {
  'ko-KR': {
    guideSearchPlaceholder: '가이드 검색',

    // 채팅 입력
    inputPlaceholder: '메시지를 입력하세요...',
    send: '보내기',

    // 아이콘 툴팁
    photoTooltip: '사진',
    planTooltip: '플랜',
    serviceTooltip: '서비스',

    // 모달 타이틀
    planTitle: '플랜',
    serviceTitle: '서비스',
    serviceSuggestionTitle: '서비스 제안',

    // 서비스 제안 모달
    title: '제목',
    startTime: '시작 시간',
    endTime: '종료 시간',
    titlePlaceholder: '제목을 입력하세요..',

    // 날짜 포맷
    dateTimeFormat: 'yy년 MM월 DD일 HH:mm',

    // 버튼
    close: '✖',
    select: '선택',

    // 플랜 아이템
    planItemTitle: '제목 : ',
    planItemRegion: '지역 : ',
    planItemPeriod: '기간 : ',
    planSelectedMessage: '플랜이 선택되었어요!',
  },
  'en-US': {
    guideSearchPlaceholder: 'Search guide',
    inputPlaceholder: 'Type a message...',
    send: 'Send',
    photoTooltip: 'Photo',
    planTooltip: 'Plan',
    serviceTooltip: 'Service',
    planTitle: 'Plan',
    serviceTitle: 'Service',
    serviceSuggestionTitle: 'Service Suggestion',
    title: 'Title',
    startTime: 'Start Time',
    endTime: 'End Time',
    titlePlaceholder: 'Enter title..',
    dateTimeFormat: 'MM/DD/YY HH:mm',
    close: '✖',
    select: 'Select',
    planItemTitle: 'Title : ',
    planItemRegion: 'Region : ',
    planItemPeriod: 'Period : ',
    planSelectedMessage: 'Plan has been selected!',
  },
  'ja-JP': {
    guideSearchPlaceholder: 'ガイド検索',
    inputPlaceholder: 'メッセージを入力してください...',
    send: '送信',
    photoTooltip: '写真',
    planTooltip: 'プラン',
    serviceTooltip: 'サービス',
    planTitle: 'プラン',
    serviceTitle: 'サービス',
    serviceSuggestionTitle: 'サービス提案',
    title: 'タイトル',
    startTime: '開始時間',
    endTime: '終了時間',
    titlePlaceholder: 'タイトルを入力してください..',
    dateTimeFormat: 'yy年MM月DD日 HH:mm',
    close: '✖',
    select: '選択',
    planItemTitle: 'タイトル : ',
    planItemRegion: '地域 : ',
    planItemPeriod: '期間 : ',
    planSelectedMessage: 'プランが選択されました！',
  },
}

const usePlans = (authorId?: number) => {
  const [plans, setPlans] = useState<Plan[]>([])

  if (!authorId) {
    return plans
  }

  useEffect(() => {
    const fetchPlans = async () => {
      const result = await getPlanList(authorId)
      setPlans(result)
    }

    fetchPlans()
  }, [authorId])

  return plans
}

const Chatting = ({
  userInfo,
  guideInfos,
  onClick,
  isClickAtMain,
}: {
  userInfo?: any
  guideInfos?: any
  onClick?: () => void
  isClickAtMain?: boolean
}) => {
  const [isClickAtChat, setIsClickAtChat] = useRecoilState(IsClickAtMain)

  // 😙
  const [userInfo2, setUserInfo2] = useState(null)

  // 📍 클릭한 roomnumber 저장
  const [roomInfo, setRoomInfo] = useState('')

  // ❌ 삭제하려는 roomnumber 저장
  const [delRoomId, setDelRoomId] = useState('')

  // 리코일
  const [chatLists, setChatLists] = useRecoilState(ChatList)

  const [roomOwner, setRoomOwner] = useState('')

  // 클릭여부 상태
  const [selectedGuideId, setSelectedGuideId] = useState(null)

  // 가이드 서비스 목록
  const [serviceList, setServiceList] = useState([])

  // 선택된 서비스 목록
  const [selectedServiceList, setSelectedServiceList] = useState({
    serviceId: '',
    serviceName: '',
  })

  const [language] = useLanguage()
  const message = messagesL[language]

  // FIXME: 클릭한 룸id값 가져오느것 까지 완료함
  useEffect(() => {
    chatLists.map((list) => {
      if (list.name === guideInfos?.nickname) {
        setRoomInfo(list.id)
      }
    })
    setRoomOwner(guideInfos?.nickname)

    // 가이드 서비스 가져오기
    const fetchGetServices = async () => {
      const result = await getServices()
      setServiceList(result)
    }

    const userInfo = localStorage.getItem('userInfo')
    setUserInfo2(userInfo ? JSON.parse(userInfo) : null)
  }, [])

  const { isConnected, messages, sendMessage, fetchMessages, justRemoveMessage } = useChat(roomInfo)

  let messageEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMessageLists(messages)
  }, [roomInfo, messages])

  // 메세지 리스트
  const [messageLists, setMessageLists] = useState<Message[]>([])
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messageLists])

  // 옵저버
  const observeRef = useObserveSingle(fetchMessages)

  //! 🌈🌈🌈 엑세스 토큰 가져오기 🌈🌈🌈
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)

  // 채팅글
  const [inputVal, setInputVal] = useState('')

  // 인풋 ref
  const inputTag = useRef<HTMLTextAreaElement>(null)

  // 모달
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false) // 플랜 모달
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false) // 서비스 모달
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false) // 서비스 제안  모달

  // 플랜 선택 내용
  const [selectePlanInfo, setSelectePlanInfo] = useState({ id: 0, title: '', time: '' })

  // 서비스 제안
  const [serviceSuggestion, setserviceSuggestion] = useState<ServiceProps>({
    name: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
  })

  const plans = usePlans(guideInfos?.id)

  // 시작일
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  // 가이드 검색 입력 값
  const [searchedGuide, setSearchedGuide] = useState('') // 입력 받은 가이드 이름
  const [selectedGuides, setSelectedGuides] = useState<Room[]>([]) // 필터링된 가이드 배열

  // 채팅 엔터치면 글 비우기
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      if (inputVal.trim() && e.nativeEvent.isComposing === false) {
        await sendMessage({ message: inputVal }, recoilToken.name)
        setInputVal('')
        if (e.nativeEvent.isComposing) {
          setInputVal('')
        }
      }
    }
  }

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

  const reservePlan = async (planId: number) => {}

  const tmpReserve = async (guideId: string) => {
    const data: ReservationPayload = {
      guideId: guideInfos?.id,
      serviceId: parseInt(selectedServiceList.serviceId),
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
    }

    createReservation(data, roomInfo)
  }

  return (
    <>
      {/* 플랜 */}
      {isPlanOpen && (
        <PlanLayout>
          <CancleBtn onClick={() => setIsPlanOpen(false)}>{message.close}</CancleBtn>
          <IconTitle>{message.planTitle}</IconTitle>
          <PlanWrapper>
            {plans.map((item, index) => (
              <PlanItem
                onClick={() => {
                  setSelectePlanInfo({
                    id: item.id,
                    title: item.title,
                    time: item.period,
                  })
                  setIsPlanOpen(false)
                  toast.success(message.planSelectedMessage)
                }}
              >
                <PlanContent>
                  <Title>
                    {message.planItemTitle}
                    {item.title}
                  </Title>
                  <Region>
                    {message.planItemRegion}
                    {item.region}
                  </Region>
                  <Region>
                    {message.planItemPeriod}
                    {message.period}
                  </Region>
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
          <CancleBtn onClick={() => setIsServiceOpen(false)}>{message.close}</CancleBtn>
          <IconTitle>{message.serviceTitle}</IconTitle>
          <PlanWrapper>
            {serviceList.map((service, index) => (
              <PlanItem
                key={index}
                onClick={() => {
                  setIsSuggestionOpen(true)
                  setSelectedServiceList((prev) => ({
                    ...prev,
                    serviceName: service.name,
                    serviceId: service.id,
                  }))
                }}
              >
                <PlanContent>
                  <Title
                    onClick={(e) => {
                      setserviceSuggestion((prev) => ({
                        ...prev,
                        serviceName: (e.target as Element).textContent ?? '',
                      }))
                    }}
                  >
                    {service.name}
                  </Title>
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
          <CancleBtn onClick={() => setIsSuggestionOpen(false)}>{message.close}</CancleBtn>
          <PlanWrapper>
            <IconTitle>{message.serviceSuggestionTitle}</IconTitle>

            {/* 제목 */}
            <ItemWrapper>
              <Title>{message.title}</Title>
              <SuggestionInput>{selectedServiceList.serviceName}</SuggestionInput>
            </ItemWrapper>

            <ItemWrapper>
              <Items>
                <Item>
                  <Title style={{ display: 'flex', alignItems: 'center' }}>
                    {message.startTime}
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
                    dateFormat={message.dateTimeFormat}
                  />
                </Item>
                <FromToIcon style={{ width: '30px', height: '30px', marginTop: '40px' }} />
                <Item>
                  <Title style={{ display: 'flex', alignItems: 'center' }}>
                    {message.endTime} <TimeIcon $width="25px" $height="25px" $marginLeft="10px" />
                  </Title>

                  <DatePicker
                    locale={ko}
                    selected={endDate}
                    onChange={(date) => date !== null && setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat={message.dateTimeFormat}
                  />
                </Item>
              </Items>
            </ItemWrapper>
            <SuggestionButton
              onClick={() => {
                setIsSuggestionOpen(false)
                setIsServiceOpen(false)
                setserviceSuggestion((prev) => ({
                  ...prev,
                  startDate,
                  endDate,
                }))
              }}
            >
              {message.select}
            </SuggestionButton>
          </PlanWrapper>
        </Suggestionayout>
      )}

      {/* 🟡🟡🟡 채팅 레이아웃 🟡🟡🟡 */}
      <ChatLayout>
        <ItemContent>
          <CancleWrapper>
            <ChatContent>
              {/* 왼쪽 ❌ */}
              <LeftSection>
                <CancleBtn
                  onClick={() => {
                    onClick()
                    setIsClickAtChat((prev) => ({
                      ...prev,
                      isClicked: !prev.isClicked,
                    }))
                  }}
                >
                  {message.close}
                </CancleBtn>

                {/* 🟡🟡🟡 가이드 검색 🟡🟡🟡 */}
                <SearchWrapper>
                  <TopSearchWrap>
                    {/* 🟡 가이드 검색 */}
                    <Input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchedGuide(e.target.value)
                        setSelectedGuides(chatLists.filter((data: any) => data.name.includes(e.target.value)))
                      }}
                      placeholder={message.guideSearchPlaceholder}
                    />
                    <SearchIcon style={{ width: '30px', height: '30px' }} />
                  </TopSearchWrap>
                </SearchWrapper>

                {/* 🟡🟡🟡🟡🟡🟡🟡현재 대화중인 사람들 🟡🟡🟡🟡🟡🟡🟡🟡 */}
                <ChatListWrapper>
                  {(searchedGuide === '' ? chatLists : selectedGuides).map((chatList: any, index: Number) => (
                    <GuideWrapper
                      data-roomId={chatList.id}
                      key={index.toString()}
                      isSelected={selectedGuideId === chatList.id}
                      onContextMenu={handleContextMenu}
                      onClick={(e: any) => {
                        setRoomInfo(e.currentTarget.dataset.roomid)
                        setIsClickAtChat((prev) => ({
                          ...prev,
                          isClicked: false,
                        }))
                        setSelectedGuideId(chatList.id)
                      }}
                    >
                      {isContextOpen && (
                        <ContextMenu data-liroom={chatList.id} ref={refForLangToggle} {...mousePosition}>
                          <ul>
                            <li>채팅방 열기</li>
                            <li data-liroomid={chatList.id} onClick={(e) => {}}>
                              채팅방 나가기
                            </li>
                          </ul>
                        </ContextMenu>
                      )}
                      <Left>
                        <ImgWrapper>
                          <img src={defaultAvatar} alt="nmo" />
                        </ImgWrapper>
                      </Left>
                      <Right>
                        <ChatCard
                          data-guide-name={chatList.name}
                          onClick={(e) => {
                            let result = e.currentTarget.getAttribute('data-guide-name')
                            if (result !== null) {
                              setRoomOwner(result)
                            }
                          }}
                        >
                          <ContentWrapper>
                            <GuideName>{chatList.name}</GuideName>
                            {false && <Star $width="30px" $height="30px" $color="yellow" />}
                          </ContentWrapper>
                          <ContentWrapper>
                            <PreviewContent>
                              {chatList.id?.length > 14 && (
                                <PreviewContent>{chatList.id.substring(0, 13) + '...'}</PreviewContent>
                              )}
                              {chatList.id?.length <= 14 && <PreviewContent>{chatList.id}</PreviewContent>}
                            </PreviewContent>
                            ・<Time>{`${2} 시간전`}</Time>
                          </ContentWrapper>
                        </ChatCard>
                      </Right>
                    </GuideWrapper>
                  ))}
                </ChatListWrapper>
              </LeftSection>
              <div
                style={{
                  width: '2px',
                  height: '40rem',
                  marginLeft: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              ></div>
              {/* 오른쪽 색션 */}
              <RightSection>
                <RightWrapper>
                  {isClickAtChat.isClicked ? (
                    // <div>{String(isClickAtChat.isClicked)}</div>
                    <DefaultChatPage>
                      <img src={logo} />
                    </DefaultChatPage>
                  ) : (
                    <>
                      <Top>
                        <TopWrapper>
                          <Image>
                            <img src={defaultAvatar} alt="NoImg" />
                          </Image>

                          <GuideName>{roomOwner}</GuideName>
                        </TopWrapper>
                      </Top>
                      <Middle>
                        <ConversationWrapper>
                          <>
                            {[...messageLists].reverse().map((messageInfo) => {
                              return (
                                // userInfo
                                <>
                                  <Conversation
                                    key={messageInfo.id}
                                    $whose={userInfo.nickname == messageInfo.sender.nickname ? true : false}
                                  >
                                    <ChatUserInfoWrapper $whose={userInfo.nickname === messageInfo.sender.nickname}>
                                      <ChatUserInfo>
                                        <img
                                          src={messageInfo.sender.avatar || 'https://github.com/cheiru94.png'}
                                          alt=""
                                        />
                                        <span>{messageInfo.sender.nickname}</span>
                                      </ChatUserInfo>
                                      {/* FIXME: 여기에 왜 who 가 들어 있는지 모르겠다 */}
                                      <Speech $whose={userInfo.nickname === messageInfo.sender.nickname}>
                                        {messageInfo.content.message}
                                        {messageInfo.content.extra?.type === 'reservation' && (
                                          <>
                                            <ServiceChat
                                              roomInfo={roomInfo}
                                              extra={messageInfo.content.extra}
                                              who={messageInfo.sender?.nickname}
                                              imgUrl={
                                                messageInfo.content.extra.data.service.photo ||
                                                messageInfo.sender.avatar
                                              }
                                              title={messageInfo.content.extra.data.service.name}
                                              start={dayjs(messageInfo.content.extra.data.startDate).format(
                                                message.dateTimeFormat,
                                              )}
                                              end={dayjs(messageInfo.content.extra.data.endDate).format(
                                                message.dateTimeFormat,
                                              )}
                                              content={messageInfo.content.extra.data.service.description}
                                            />
                                          </>
                                        )}
                                        {messageInfo.content.extra?.type === 'plan' && (
                                          <>
                                            <PlanChat
                                              // roomInfo={roomInfo}
                                              // extra={messageInfo.content.extra}
                                              location="a"
                                              who={messageInfo.sender?.nickname}
                                              imgUrl={
                                                messageInfo.content.extra.data.service.photo ||
                                                messageInfo.sender.avatar
                                              }
                                              title={messageInfo.content.extra.data.service.name}
                                              start={dayjs(messageInfo.content.extra.data.startDate).format(
                                                message.dateTimeFormat,
                                              )}
                                              end={dayjs(messageInfo.content.extra.data.endDate).format(
                                                message.dateTimeFormat,
                                              )}
                                              content={messageInfo.content.extra.data.service.description}
                                            />
                                          </>
                                        )}
                                      </Speech>
                                    </ChatUserInfoWrapper>
                                  </Conversation>
                                </>
                              )
                            })}
                          </>

                          {/* 🟡  플랜 올릴 때 */}
                          {/* <PlanChat
                            who={'me'}
                            imgUrl={userImg}
                            location={'울산'}
                            title={'플랜 제목'}
                            start={'4월 17, 2024 2:23 오후'}
                            end={'4월 17, 2024 2:23 오후'}
                            content={
                              '내가 그의 이름을 불러주기 전에는 그는 다만 하나의 몸짓에 지나지 않았다. 내가 그의 이름을 불러주었을 때 그는 나에게로 와서 꽃이 되었다.'
                            }
                          />

                          <ServiceChat
                            who={'me'}
                            imgUrl={userImg}
                            title={'서비스 제목'}
                            start={'4월 17, 2024 2:23 오후'}
                            end={'4월 17, 2024 2:23 오후'}
                            content={
                              '내가 그의 이름을 불러주기 전에는 그는 다만 하나의 몸짓에 지나지 않았다. 내가 그의 이름을 불러주었을 때 그는 나에게로 와서 꽃이 되었다.'
                            }
                          /> */}

                          <div style={{ width: '100%', height: '1rem' }} ref={observeRef} />
                          <div style={{ width: '100%', height: '1px' }} ref={messageEndRef} />
                        </ConversationWrapper>
                      </Middle>
                      <Bottom>
                        <InputTag
                          ref={inputTag}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          onKeyDown={handleKeyPress} // 키 이벤트 핸들러 추가
                          placeholder={message.inputPlaceholder}
                        />
                        <IconsContainer>
                          <IconWrapper>
                            {/* 이미지 추가 아이콘  */}
                            <label htmlFor="file-input">
                              <TooltipIcon data-tooltip={message.photoTooltip}>
                                <ImageIcon />
                              </TooltipIcon>
                            </label>
                            <ImgInputTag id="file-input" type="file" onChange={handleFileUpload} />

                            {/* 플랜 추가 아이콘 */}
                            <TooltipIcon data-tooltip={message.planTooltip}>
                              <PlanIcon
                                onClick={() => {
                                  setIsPlanOpen(true)
                                }}
                                style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', margin: ' 0 0.5rem' }}
                              />
                            </TooltipIcon>

                            {/* 서비스 추가 아이콘 */}
                            <TooltipIcon data-tooltip={message.serviceTooltip}>
                              <ServiceIcon
                                onClick={() => {
                                  setIsServiceOpen(true) // 1. 서비스 모달창 띄우기
                                  // 2. 🌈🌈🌈🌈🌈가이드가 가진 서비스 불러오기
                                }}
                                style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}
                              />
                            </TooltipIcon>
                          </IconWrapper>
                          <SendBtn
                            disabled={!inputVal.length}
                            $inputVal={inputVal.length > 0 ? true : false}
                            onClick={() => {
                              sendMessage({ message: inputVal }, recoilToken.name)
                              setInputVal('')
                              inputTag.current?.focus()
                            }}
                          >
                            {message.send}
                          </SendBtn>
                        </IconsContainer>
                      </Bottom>
                    </>
                  )}
                </RightWrapper>
              </RightSection>
            </ChatContent>
          </CancleWrapper>
        </ItemContent>
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
const ItemContent = styled.div`
  width: 70rem;
  height: 40rem;
  background-color: #ffffffe9;
  background: linear-gradient(135deg, #fbdd9c 10%, #fbd2df 100%);
  /* background-color: #ffffffd7; */
  border-radius: 7px;
  padding: 10px;
  position: absolute;
`

const CancleWrapper = styled.div`
  /* background-color: #e5ff00; */
  top: 0;
  right: 0;
  /* padding: 10px; */
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
const GuideWrapper = styled(FlexCenter)<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  justify-content: flex-start;
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  background-color: ${({ isSelected }) => (isSelected ? '#f0f0f069' : 'none')};

  cursor: pointer;

  &:hover {
    background-color: #f0f0f069;
  }
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
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.3rem;
  /* background-color: #fb574e; */
`
const ChatCard = styled.div`
  /* background-color: white; */
  /* background-color: #fb574e; */
`

const GuideName = styled.div`
  font-size: 1.3rem;
  text-align: center;
  /* margin-right: 3rem; */
  padding: 0.5rem;
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
  flex: 1.9;
`
const RightWrapper = styled.div`
  position: relative;
  top: -1rem;
  width: 100%;
  height: 100%;
  /* background-color: mediumaquamarine; */
  border-radius: 0.5rem;
  padding: 0.5rem 0rem 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

/* 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡대화창을 선택하라 알리기 */
const DefaultChatPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    border-radius: 10px;
    background-color: red;
    width: 20rem;
    /* height: 20rem; */
  }
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
  height: 27rem;
  /* 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 */
  /* background-color: red; */
  overflow: auto;

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
const Conversation = styled.div<{ $whose: boolean }>`
  /* background-color: #a6f690; */
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: ${({ $whose }) => ($whose == true ? 'flex-end' : 'flex-start')};
`

const ChatUserInfoWrapper = styled.span<{ $whose: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $whose }) => ($whose == true ? 'end' : 'start')};
  /* background-color: red; */
`

const ChatUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0 0.5rem 0.2rem;
  /* margin-left: 0.5rem; */

  & img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
  }
`

// 채팅 풍선
const Speech = styled.div<{ $whose: boolean }>`
  background-color: ${(props) => (props.$whose == true ? 'white' : '#f6d690')};
  /* background-color: blue; */
  padding: 1rem;
  border-radius: 0.5rem;
  width: auto; // 넓이를 자동으로 설정
  box-sizing: border-box;
  word-break: break-all;
  img {
    min-width: 10rem;
    min-height: 10rem;
    margin-bottom: 0.5rem;
    border-radius: 7px;
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

// const SuggestionInput = styled.input`
const SuggestionInput = styled.div`
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  width: 100%;
  align-self: stretch;
  border-radius: 12px;
  background-color: #f0f0f0;
  /* border: 2px dashed #ccc; */
  /* color: #888; */
  /* border: 2px solid var(--color-original); */
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
