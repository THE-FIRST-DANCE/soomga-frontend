import { PlanListRecoil } from 'state/store/PlanList'

export interface GooglePlaceResponse {
  next_page_token: string
  results: GooglePlace[]
}

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

export interface GooglePlacePhoto {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

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

interface openingHours {
  dayOfWeek: number
  openTime: string
  closeTime: string
  id: number
}

export interface PlanConfirmItemResponse {
  [period: number]: PlanConfirmItemData[]
}

export interface PlanConfirmItemData {
  id: number
  stayTime: string
  nextTime: string
  item: PlaceData
  nextLat: number
  nextLng: number
  nextPlaceId: number
  nextPlaceGoogleId: string
  nextPlaceName: string
}

export interface Plans {
  id: number
  title: string
  authorId: number
  region: string
  transport: string
  period: number
  daySchedules: dayPlan[]
}

export interface dayPlan {
  id: number
  day: number
  planId: number
  schedules: PlanListRecoil[]
}
