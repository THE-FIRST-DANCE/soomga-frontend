interface PlanList {
  id: number
  member_id: number
}

interface PlanItem {
  id: number
  name: string
  description: string
  place_id: number
  full_time: string
}

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
