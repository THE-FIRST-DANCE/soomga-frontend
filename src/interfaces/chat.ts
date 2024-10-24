import { Reservation } from './reservation'
import { Upload } from './upload'

export interface ChatButtonProps {
  onClick: () => void
}

export interface MouseAxis {
  xAxis: number
  yAxis: number
}

export interface WhoseChat {
  $whose: string
}

export interface ServiceProps {
  name: string
  title: string
  startDate: Date
  endDate: Date
}

export interface SelectedGuide {
  name: string
  img: string
  content: string
  time: number
}

export interface Member {
  id: Number
  nickname: string
  avatar?: string | null
}
export interface Room {
  id: string
  name: string
  members?: Member[]
  createdAt: string
  deletedAt: string
}

export interface MessagePayload {
  roomId: string
  accessToken: string
  content: string
}

export interface MessagePaginate {
  items: Message[]
  nextCursor: number
}

export interface Sender {
  id: number
  nickname: string
  avatar?: string
}

export interface Content {
  message: string
  extra?: Extra
}

export interface Message {
  id: number
  sender: Sender
  content: Content
  createdAt: string
}

// Extra
export interface PhotoExtra {
  type: 'photo'
  data: Upload // photoUrl
}

export interface FileExtra {
  type: 'file'
  data: Upload
}

export interface ReservationExtra {
  type: 'reservation'
  data: Reservation
}
export interface Plan {
  service?: any
  startDate: Date
  endDate: Date
}
export interface PlanExtra {
  type: 'plan'
  data: Plan
}

export type Extra = PhotoExtra | FileExtra | ReservationExtra | PlanExtra
