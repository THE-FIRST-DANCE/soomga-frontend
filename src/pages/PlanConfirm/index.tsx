import { savePlan } from 'api/PlanAPI'
import GoogleMapLoad from 'components/planner/GoogleMap'
import PlanConfirmItem from 'components/planner/PlanConfirmItem'
import PlanEdit from 'components/planner/PlanEdit'
import PlanLeftTab from 'components/planner/PlanLeftTab'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { CurrentPeriod } from 'state/store/PlanInfo'
import { PlanConfirmList } from 'state/store/PlanList'
import styled from 'styled-components'

const PlanConfirm = () => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const planConfirmList = useRecoilValue(PlanConfirmList)
  const currentPeriod = useRecoilValue(CurrentPeriod)

  const navigate = useNavigate()

  const planList = planConfirmList.periodPlan[currentPeriod] || []

  const onNext = async () => {
    const data = {
      planId: 1,
      title: planConfirmList.info.title,
      period: planConfirmList.info.period,
      region: planConfirmList.info.province,
      list: planConfirmList.periodPlan,
      transport: planConfirmList.transport,
    }

    console.log(data)

    await savePlan(data)

    navigate('/planner')
  }

  const onEdit = () => {
    setEditMode(true)
  }

  const handleEdit = () => {
    setEditMode(false)
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
      <LeftSection initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
        {editMode ? (
          <PlanEdit
            data={planConfirmList.periodPlan}
            handleEdit={handleEdit}
            info={planConfirmList.info}
            transport={planConfirmList.transport}
          />
        ) : (
          <>
            <PlanLeftTab
              onNext={onNext}
              onEdit={onEdit}
              nextText="저장"
              editText="편집"
              period={planConfirmList.info.period}
            />
            <LeftItem>
              <Header>
                <Title>{planConfirmList.info.title}</Title>
                <Region>{planConfirmList.info.province}</Region>
              </Header>
              <PlanListDiv>
                {planList.length > 0 &&
                  planList.map((item, index) => <PlanConfirmItem index={index} key={index} data={item} />)}
              </PlanListDiv>
            </LeftItem>
          </>
        )}
      </LeftSection>

      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: planConfirmList.info.lat,
            lng: planConfirmList.info.lng,
          }}
          customMarker={editMode ? [] : markers}
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
  flex: 1.5;
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
