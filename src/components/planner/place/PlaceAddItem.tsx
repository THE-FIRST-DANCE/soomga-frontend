import Plus from 'components/icons/Plus'
import { GooglePlace } from 'interfaces/plan'
import styled from 'styled-components'
import PlaceAddModal from './PlaceAddModal'
import { useState } from 'react'

interface PlaceAddItemProps {
  item: GooglePlace
  region: string
  changeCenter: (lat: number, lng: number) => void
}

const PlaceAddItem = ({ item, changeCenter, region }: PlaceAddItemProps) => {
  const [isOpen, setIsOpen] = useState(false) // 모달 오픈 여부

  // 장소 사진 가져오기
  // 후에 이 결과를 백에 저장
  const getUrl = (photoReference: string) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_CLIENT_ID}`
  }

  const image = item.photos ? getUrl(item.photos[0].photo_reference) : item.icon

  // 장소 클릭 시 지도 중심 마커로 이동
  const onClick = () => {
    changeCenter(item.geometry.location.lat, item.geometry.location.lng)
  }

  return (
    <Container>
      <PlacePhoto>
        <img src={image} alt={item.name} />
      </PlacePhoto>

      <PlaceInfo
        onClick={() => {
          onClick()
        }}
      >
        <PlaceName>{item.name}</PlaceName>
        <PlaceAddress>{item.vicinity}</PlaceAddress>
      </PlaceInfo>

      <CheckContainer
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <Plus style={{ width: '1rem', height: '1rem', fill: 'var(--bs-gray-500)' }} />
      </CheckContainer>

      <PlaceAddModal
        region={region}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        place={item}
        image={image}
      />
    </Container>
  )
}

export default PlaceAddItem

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`

const PlaceInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  cursor: pointer;
`

const PlaceName = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const PlaceAddress = styled.div`
  font-size: 14px;
  color: var(--bs-gray-500);
`

const PlacePhoto = styled.div`
  width: 48px;
  height: 48px;
  flex: 0.3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`

const CheckContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  margin-right: 1rem;
`
