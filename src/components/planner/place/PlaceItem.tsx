import Plus from 'components/icons/Plus'
import Star from 'components/icons/Star'
import Check from 'components/icons/Check'
import styled from 'styled-components'
import { PlaceData } from 'interfaces/plan'
import { categories } from './PlaceSelect'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PeriodPlanRecoil } from 'recoil/atoms/PlanList'
import useSubstring from 'hooks/useSubstring'
import { useState } from 'react'
import PlaceDetail from './PlaceDetail'
import { CurrentPeriod } from 'recoil/atoms/PlanInfo'

const PlaceItem = ({ data }: { data: PlaceData }) => {
  const address = useSubstring(data.address, 10)
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [planPeriod, setPlanPeriod] = useRecoilState(PeriodPlanRecoil)
  const [detailModal, setDetailModal] = useState<boolean>(false)

  const category = categories.find((category) => category.value === data.category)
  const currentPlan = planPeriod[currentPeriod] || []
  const checked = currentPlan.some((item) => item.item.placeId === data.placeId)

  const handleAddList = () => {
    setPlanPeriod((prev) => {
      const currentPlan = [...(prev[currentPeriod] || [])]

      if (checked) {
        // 아이템 삭제 로직
        const newPlan = currentPlan.filter((item) => item.item.placeId !== data.placeId)
        const newPlanOrder = newPlan.map((item, index) => {
          return {
            ...item,
            order: index + 1,
          }
        })
        return {
          ...prev,
          [currentPeriod]: newPlanOrder,
        }
      } else {
        // 아이템 추가 로직
        const newPlan = [
          ...currentPlan,
          {
            item: data,
            order: currentPlan.length + 1,
            stayTime: '1시간 0분',
            checked: true,
          },
        ]
        return {
          ...prev,
          [currentPeriod]: newPlan,
        }
      }
    })
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
