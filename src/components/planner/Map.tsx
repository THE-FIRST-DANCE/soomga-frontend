import { Container, NaverMap, NavermapsProvider } from 'react-naver-maps'

const Map = ({ width, height }: { width: string; height: string }) => {
  return (
    <Container
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_CLIENT_ID}>
        <NaverMap defaultCenter={{ lat: 37.3595704, lng: 127.105399 }} defaultZoom={10} />
      </NavermapsProvider>
    </Container>
  )
}

export default Map
