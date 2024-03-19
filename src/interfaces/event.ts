import { Plans } from './plan'

export interface EventData {
  id: number
  memberId: number
  title: string
  start: Date
  end: Date
  allDay: boolean
  description: string
  plan: Plans
}
