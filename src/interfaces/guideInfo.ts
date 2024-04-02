export interface GuideInfo {
  id: string
  nickname: string
  avatar: string | null
  birthdate: string
  languages: LanguageInfo[]
  guideProfile: GuideProfile
  guideReviews: any[]
  tags: any[]
  avgLocationScore: number
  avgKindnessScore: number
  avgCommunicationScore: number
  totalAvgScore: number
}

export interface Pagination<Type> {
  items: Type[]
  nextCursor: number | null
}

// languages
interface LanguageInfo {
  language: {
    id: number
    name: string
  }
}

// guideProfile
interface GuideProfile {
  areas: AreaInfo[]
  temperature: number
}

// guideProfile - areas
interface AreaInfo {
  area: {
    id: number
    name: string
  }
}
