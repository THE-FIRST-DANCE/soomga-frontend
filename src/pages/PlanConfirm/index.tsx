import { getPlaceRoute } from 'api/PlanAPI'
import GoogleMapLoad from 'components/planner/GoogleMap'
import PlanConfirmItem from 'components/planner/PlanConfirmItem'
import PlanLeftTab from 'components/planner/PlanLeftTab'
import FullLoading from 'components/shared/FullLoading'
import { motion } from 'framer-motion'
import { PlanConfirmItemResponse } from 'interfaces/plan'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { CurrentPeriod, PlanInfo } from 'recoil/atoms/PlanInfo'
import { PlanListConfirm } from 'recoil/atoms/PlanList'
import styled from 'styled-components'

const PlanConfirm = () => {
  const [planConfirmList, setPlanConfirmList] = useState<PlanConfirmItemResponse>({})
  const currentPeriod = useRecoilValue(CurrentPeriod)

  const planInfo = useRecoilValue(PlanInfo)
  const planListConfirm = useRecoilValue(PlanListConfirm)

  const planList = planConfirmList[currentPeriod] || []

  const navigate = useNavigate()

  const { isFetching } = useQuery(
    'getPlaceRoute',
    () =>
      getPlaceRoute({
        list: planListConfirm.planList,
        transport: planListConfirm.transport,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setPlanConfirmList(data)
      },
    },
  )

  const onNext = () => {
    console.log('다음')
  }

  const onPrev = () => {
    navigate('/planner/create')
  }

  const svgToDataUrl = (svg: string) => {
    const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
    const header = 'data:image/svg+xml,'
    return header + encoded
  }

  const markers =
    planList &&
    planList.map((item, index) => {
      const svgMarkup = `
      <svg width="20" height="40" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFD766" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="300" fill="#000">${index + 1}</text>
      </svg>
      `
      const svgIconUrl = svgToDataUrl(svgMarkup)

      return {
        position: {
          lat: item.item.latitude,
          lng: item.item.longitude,
        },
        icon: svgIconUrl,
      }
    })

  return (
    <Container>
      {isFetching ? (
        <FullLoading isLoading={isFetching} />
      ) : (
        <LeftSection initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
          <PlanLeftTab onNext={onNext} onPrev={onPrev} />
          <LeftItem>
            <Header>
              <Title>{planInfo.title}</Title>
              <Region>{planInfo.province}</Region>
            </Header>

            <PlanListDiv>
              {planList.length > 0 &&
                planList.map((item, index) => <PlanConfirmItem index={index} key={index} data={item} />)}
            </PlanListDiv>
          </LeftItem>
        </LeftSection>
      )}
      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: planInfo.lat,
            lng: planInfo.lng,
          }}
          customMarker={markers}
        />
      </RightSection>
    </Container>
  )
}

export default PlanConfirm

const Container = styled.div`
  display: flex;
`

const LeftSection = styled(motion.div)`
  display: flex;
  flex: 1;
  height: 100vh;
`

const RightSection = styled.div`
  flex: 2;
  height: 100vh;
`

const LeftItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #f2f2f2;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Region = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const PlanListDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
`
