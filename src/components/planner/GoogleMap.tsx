import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api'
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
  zoom?: number
  marker?: {
    lat: number
    lng: number
  }[]
  customMarker?: {
    position: {
      lat: number
      lng: number
    }
    icon: string
  }[]
}

const GoogleMapLoad = ({
  mapContainerStyle,
  center = {
    lat: 37.5,
    lng: 127,
  },
  zoom = 12,
  marker = [],
  customMarker = [],
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
          return <MarkerF key={index} position={{ lat: item.lat, lng: item.lng }} />
        })}

        {customMarker.slice(0, -1).map((item, index) => (
          <MarkerF key={index} position={item.position} icon={item.icon} />
        ))}

        <PolylineF
          path={customMarker.map((item) => item.position)}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    )
  )
}

export default GoogleMapLoad
