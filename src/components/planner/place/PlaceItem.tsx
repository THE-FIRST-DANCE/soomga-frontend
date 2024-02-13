import Plus from 'components/icons/Plus'
import Star from 'components/icons/Star'
import Check from 'components/icons/Check'
import styled from 'styled-components'
import { PlaceData } from 'interfaces/plan'
import { categories } from './PlaceSelect'
import { useRecoilState } from 'recoil'
import { PlanListRecoil } from 'recoil/atoms/PlanList'
import useSubstring from 'hooks/useSubstring'
import { useState } from 'react'
import PlaceDetail from './PlaceDetail'

const PlaceItem = ({ data }: { data: PlaceData }) => {
  const address = useSubstring(data.address, 20)
  const [placeList, setPlaceList] = useRecoilState(PlanListRecoil)
  const [detailModal, setDetailModal] = useState<boolean>(false)
  const category = categories.find((category) => category.value === data.category)
  const currentItem = placeList.find((item) => item.item.placeId === data.placeId)
  const checked = currentItem ? currentItem.checked : false

  const handleAddList = () => {
    if (checked) {
      setPlaceList((prev) => prev.filter((item) => item.item.placeId !== data.placeId))
    } else {
      setPlaceList((prev) => [
        ...prev,
        {
          item: data,
          order: prev.length + 1,
          time: '1시간 0분',
          checked: true,
        },
      ])
    }
  }

  return (
    <Container>
      <Image>
        <img src="https://cdn.pixabay.com/photo/2022/10/15/16/44/night-view-7523474_1280.jpg" alt="장소 이미지" />
      </Image>

      <Info
        onClick={() => {
          setDetailModal(true)
        }}
      >
        <Title>{data.name}</Title>
        <SubInfo>
          <Category>{category?.label}</Category>
          <Address>{address}</Address>
        </SubInfo>

        <Rating>
          <Star $width="1rem" $height="1rem" $color="var(--color-primary)" />
          <div
            style={{
              marginTop: '0.3rem',
              color: 'var(--bs-gray)',
            }}
          >
            {data.rating}
          </div>
        </Rating>
      </Info>

      <CheckContainer checked={checked} onClick={handleAddList}>
        {checked ? (
          <Check style={{ width: '1rem', height: '1rem', fill: 'var(--bs-white)' }} />
        ) : (
          <Plus style={{ width: '1rem', height: '1rem', fill: 'var(--bs-gray-500)' }} />
        )}
      </CheckContainer>

      <PlaceDetail place={data} isOpen={detailModal} onRequestClose={() => setDetailModal(false)} />
    </Container>
  )
}

export default PlaceItem

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-shadow: var(--bs-box-shadow);
  margin-bottom: 1rem;
`

const Image = styled.div`
  width: 4rem;
  height: 4rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`

const Info = styled.div`
  height: 100%;
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
`

const Category = styled.div`
  font-size: 0.8rem;
  color: var(--bs-gray-500);
`

const Address = styled.div`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: var(--bs-gray);
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: var(--bs-gray);
`

const CheckContainer = styled.div<{ checked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.checked ? 'var(--color-primary)' : 'var(--bs-gray-200)')};
  margin-right: 1rem;
`
