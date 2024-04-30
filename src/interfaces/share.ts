export interface CommentType {
  id: number
  content: string
  createdAt: Date
  member: AuthorType
}

export interface AuthorType {
  id: number
  avatar: string
  birthdate: Date
  nickname: string
  email?: string
}
