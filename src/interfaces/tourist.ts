import { Member } from './guideInfo'
import { CommentType } from './share'

export interface Tourist {
  id: number
  title: string
  content: string
  createdAt: Date
  areaId: number
  tags: {
    tag: tag
  }[]
  author: Member
  _count: {
    comments: number
    likes: number
  }
  likes: TouristLike[]
  comments: CommentType[]
}

export interface tag {
  id: number
  name: string
}

export interface TouristLike {
  memberId: number
}
