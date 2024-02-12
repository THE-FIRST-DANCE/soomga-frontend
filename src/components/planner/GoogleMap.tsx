import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

interface GoogleMapProps {
  mapContainerStyle: {
    width: string
    height: string
  }
  center?: {
    lat: number
    lng: number
  }
  zoom?: number | 12
  marker?: {
    lat: number
    lng: number
  }[]
}

const GoogleMapLoad = ({
  mapContainerStyle,
  center = {
    lat: 37.5,
    lng: 127,
  },
  zoom,
  marker = [],
}: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {marker.map((item, index) => {
          return <Marker key={index} position={{ lat: item.lat, lng: item.lng }} />
        })}
      </GoogleMap>
    )
  )
}

export default GoogleMapLoad
