import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import { Content, Message } from '../../interfaces/chat'
import { getMessages } from '../../api/ChatAPI'

export const useChat = (roomId: string | undefined) => {
  const [isConnected, setIsConnected] = useState(socket.connected) // 소켓 연결 상태 "boolean" 으로 관리
  const [messages, setMessages] = useState<Message[]>([]) // 채팅방의 메세지 목록 배열관리
  const [cursor, setCursor] = useState<number>() // 메세지 페이징을 위한 커서 관리

  //! 연결
  const onConnect = () => {
    setIsConnected(true)
  }

  //! 연결 끊김
  const onDisconnect = () => {
    setIsConnected(false)
  }

  //! ✅ 소켓 이벤트 ✅
  useEffect(() => {
    console.log('roomId', roomId)
    console.log('🌈소켓 연결 상태: ', isConnected)
    // 소켓이 서버와 연결되었을 때 발생하는 이벤트
    socket.on('connect', onConnect)
    // 소켓 연결이 끊겼을 때 발생하는 이벤트
    socket.on('disconnect', onDisconnect)
    // 새 메시지가 도착했을 때 발생하는 이벤트 : 새 메시지가 도착하면 메시지 목록에 추가
    socket.on('newMessage', (message) => setMessages((prev) => [message, ...prev]))

    // 클린업 : 언마운트시 실행
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('newMessage')
    }
  }, [])

  //! ✅ 방번호가 변경되면 실행 ✅
  useEffect(() => {
    console.log('🟡useEffect_방번호:', roomId)
    if (!roomId) return // 방 번호 없으면 실행 취소
    socket.emit('joinRoom', { roomId }) // 입장한 방 번호 서버에 전달

    // 서버로부터 해당 방의 메시지를 초기로드, 로드된 메시지와 다음 커서 위치를 상태에 설정
    getMessages(roomId).then(({ items, nextCursor }) => {
      setMessages(items)
      setCursor(nextCursor)
    })

    // 클린업: 언마운트되거나 다른 방으로 변경될 때, 현재 방을 나가고 메시지 목록을 초기화
    return () => {
      if (!roomId) return

      socket.emit('leaveRoom', { roomId })
      setMessages([])
    }
  }, [roomId])

  //! 메세지 보내기
  const sendMessage = (content: Content, accessToken: string) => {
    console.log('✈️✈️✈️메세지 보내기가 활성화됨')
    // 서버로 보낼 메세지 전송:     "방 ID" "사용자의 접근 토큰", "메시지 내용"  서버에 전달
    socket.emit('newMessage', { roomId, accessToken, content })
  }

  //! 채팅방 메세지 가져오기
  const fetchMessages = async () => {
    console.log('🌈 현재 커서 :', cursor)

    if (!cursor || !roomId) return
    try {
      // 채팅방 메세지 가져오기 :  사용자가 추가 메시지를 로드하려 할 때 사용 ,
      // 현재 커서를 기반으로 다음 페이지의 메시지를 요청하고, 로드된 메시지를 기존 목록에 추가
      const { items, nextCursor } = await getMessages(roomId, cursor)
      setMessages((prev) => [...prev, ...items])
      setCursor(nextCursor) // nextCursor를 저장
    } catch (e) {
      console.error(e)
    }
  }

  //! 메세지 삭제: 특정 메시지를 목록에서 삭제
  const justRemoveMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId))
  }

  return {
    isConnected,
    messages,
    sendMessage,
    setMessages,
    fetchMessages,
    justRemoveMessage,
  }
}
