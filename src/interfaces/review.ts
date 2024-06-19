import { Member } from './guideInfo'

export interface Review {
  id: number
  memberId: number
  content: string
  reviewer: Member
  communicationScore: number
  kindnessScore: number
  locationScore: number
  createdAt: string
}
