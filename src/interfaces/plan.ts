// 장소 검색 결과
export interface GooglePlaceResponse {
  next_page_token: string
  results: GooglePlace[]
}

// 장소 검색 결과 아이템
export interface GooglePlace {
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  name: string
  photos: GooglePlacePhoto[]
  place_id: string
  rating: number
  vicinity: string
  icon: string
}

// 장소 사진 정보
export interface GooglePlacePhoto {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

// 장소 데이터 타입 (서버)
export interface PlaceData {
  id?: number
  name: string
  placeId: string
  rating: number
  address: string
  photo: string
  category: string
  latitude: number
  longitude: number
  region: string
  url?: string
  phone?: string
  detailAddress?: string
  openingHours?: openingHours[]
}

// 장소 데이터 시간 정보 (서버)
interface openingHours {
  dayOfWeek: number
  openTime: string
  closeTime: string
  id: number
}

// 플랜 데이터 (서버)
export interface Plans {
  id: number
  title: string
  authorId: number
  region: string
  transport: string
  period: number
  daySchedules: dayPlan[]
}

// 플랜 데이터 날짜별 스케쥴 (서버)
export interface dayPlan {
  id: number
  day: number
  planId: number
  schedules: PlanConfirmListItem[]
}

// 플랜 컨펌 데이터
export interface PlanConfirmPeriodList {
  [period: number]: PlanConfirmListItem[]
}

// 플랜 컨펌 리스트 아이템
export interface PlanConfirmListItem {
  item: PlaceData
  nextLat: number
  nextLng: number
  nextPlaceId: number
  nextPlaceName: string
  nextPlaceGoogleId: string
  nextTime: string
  stayTime: string
}
