/* getGuideList에서 사용 */
export interface GuideProfile {
  id: number
  temperature: number | null
  service: string | null
  phoneNumber: string | null
  verifiedAt: string | null
  verifiedId: boolean | null
  verifiedBankAccount: boolean | null
  member: Member
  areas: Areas[]
  languageCertifications: LanguageCertifications[]
  _count: Count
  avgLocationScore: number
  avgKindnessScore: number
  avgCommunicationScore: number
  totalAvgScore: number
}

export interface Member {
  id: number
  email: string
  nickname: string
  password: string
  avatar: string
  birthdate: string
  gender: string
  status: string
  role: string
  provider: string
  providerId: null
  pushToken: null
  createdAt: string
  updatedAt: string
  deletedAt: null
  languages: Languages[]
}

interface Languages {
  language: {
    id: number
    name: string
  }
}

interface Areas {
  area: Area
}
interface Area {
  id: number
  name: string
}

interface LanguageCertifications {
  languageCertification: LanguageCertification
}
interface LanguageCertification {
  id: number
  name: string
  LanguageId: number
}

interface Count {
  reviews: number
}

/* getGuideList에서 사용, 페이지 네이션 인터페이스   */
export interface Pagination<Type> {
  items: Type[]
  nextCursor: number | null
  count?: number
}
