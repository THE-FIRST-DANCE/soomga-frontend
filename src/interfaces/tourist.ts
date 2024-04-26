import { Member } from './guideInfo'

export interface Tourist {
  id: number
  title: string
  content: string
  createdAt: Date
  tags: {
    tag: tag
  }[]
  author: Member
  _count: {
    comments: number
    likes: number
  }
  likes: TouristLike[]
  comments: BoardCommentType[]
}

export interface tag {
  id: number
  name: string
}

export interface TouristLike {
  memberId: number
}

export interface BoardCommentType {
  id: number
  content: string
  createdAt: Date
  member: Member
}
