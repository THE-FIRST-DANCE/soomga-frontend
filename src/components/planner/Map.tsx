import { Container, NaverMap, NavermapsProvider } from 'react-naver-maps'

const Map = ({ width, height, zoom }: { width: string; height: string; borderRadius?: number; zoom?: number }) => {
  return (
    <Container
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_CLIENT_ID}>
        <NaverMap defaultCenter={{ lat: 37.3595704, lng: 127.105399 }} defaultZoom={zoom} />
      </NavermapsProvider>
    </Container>
  )
}

export default Map
