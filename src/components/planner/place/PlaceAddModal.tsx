import { addPlaceApi } from 'api/PlanAPI'
import Cancel from 'components/icons/Cancel'
import Modal from 'components/shared/Modal'
import { GooglePlace, PlaceData } from 'interfaces/plan'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import styled from 'styled-components'
import FullLoading from 'components/shared/FullLoading'

interface IPlaceAddModal {
  isOpen: boolean
  onRequestClose: () => void
  place: GooglePlace
  region: string
  image: string
}

const PlaceAddModal = ({ isOpen, onRequestClose, place, region, image }: IPlaceAddModal) => {
  const [category, setCategory] = useState('tourist_attraction') // 카테고리

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  // 장소 추가 query
  const { mutate, isPending } = useMutation({
    mutationFn: addPlaceApi,
    onSuccess: () => {
      alert('장소가 추가되었습니다.')
      onRequestClose()
    },
  })

  // 장소 추가
  const handleAddPlace = () => {
    const data: PlaceData = {
      name: place.name,
      placeId: place.place_id,
      rating: place.rating ? place.rating : 0.0,
      address: place.vicinity,
      photo: image,
      category,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      region,
    }

    if (window.confirm('이 장소를 등록하시겠습니까?') === false) return

    mutate(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: '400px',
        },
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <Cancel $width="24px" $height="24px" onClick={() => onRequestClose()} />
      </div>
      <PlaceModal>
        <PlaceTitle>{place.name}</PlaceTitle>
        <PlaceAddress>{place.vicinity}</PlaceAddress>
        <PlaceCategory value={category} onChange={handleCategoryChange} name="category">
          <option value="tourist_attraction">명소</option>
          <option value="restaurant">음식점</option>
          <option value="cafe">카페</option>
          <option value="lodging">숙소</option>
        </PlaceCategory>
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        >
          이 장소를 등록하시겠습니까?
        </p>
        <PlaceButton
          onClick={() => {
            handleAddPlace()
          }}
        >
          등록하기
        </PlaceButton>

        {isPending && <FullLoading isLoading={isPending} />}
      </PlaceModal>
    </Modal>
  )
}

export default PlaceAddModal

const PlaceModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const PlaceTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const PlaceAddress = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`

const PlaceCategory = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`

const PlaceButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #ffce00;
  }
`
