import { GoogleMap, LoadScript } from '@react-google-maps/api'

interface GoogleMapProps {
  mapContainerStyle: {
    width: string
    height: string
  }
  center?: {
    lat: number
    lng: number
  }
  zoom?: number
}

const GoogleMapLoad = ({
  mapContainerStyle,
  center = {
    lat: 37.5,
    lng: 127,
  },
  zoom = 12,
}: GoogleMapProps) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom} />
    </LoadScript>
  )
}

export default GoogleMapLoad
