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
  id: number
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
  time: string
  nextTime: string
  item: PlaceData
  nextLat: number
  nextLng: number
  nextPlaceId: number
  nextPlaceGoogleId: string
  nextPlaceName: string
}
