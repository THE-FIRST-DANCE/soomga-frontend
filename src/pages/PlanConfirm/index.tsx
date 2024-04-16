import { useMutation } from '@tanstack/react-query'
import { deletePlan, savePlan } from 'api/PlanAPI'
import GoogleMapLoad from 'components/planner/GoogleMap'
import PlanConfirmItem from 'components/planner/PlanConfirmItem'
import PlanEdit from 'components/planner/PlanEdit'
import PlanLeftTab from 'components/planner/PlanLeftTab'
import { motion } from 'framer-motion'
import { usePlanConfirm } from 'hooks/plan/usePlanConfirm'
import { PlanConfirmListItem } from 'interfaces/plan'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { CurrentPeriod } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { svgToDataUrl } from 'utils/svgToDataUrl'

const PlanConfirmPage = () => {
  const { planConfirm } = usePlanConfirm()
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [planList, setPlanList] = useState<PlanConfirmListItem[]>([])
  const { planId } = useParams<{ planId: string }>()
  const memberId = 2

  useEffect(() => {
    if (planConfirm.periodPlan[currentPeriod]) {
      setPlanList(planConfirm.periodPlan[currentPeriod])
    }
  }, [planConfirm, currentPeriod])

  const [editMode, setEditMode] = useState<boolean>(false)

  const navigate = useNavigate()

  const { mutate: savePlanMutate } = useMutation({
    mutationFn: savePlan,
    onSuccess: () => {
      navigate('/planner')
    },
  })

  const { mutate: deletePlanMutate } = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      navigate('/planner')
    },
  })

  const onNext = async () => {
    const data = {
      memberId,
      planId: planId ? Number(planId) : null,
      title: planConfirm.info.title,
      period: planConfirm.info.period,
      region: planConfirm.info.province,
      list: planConfirm.periodPlan,
      transport: planConfirm.transport,
    }

    savePlanMutate(data)
  }

  const onEdit = () => {
    setEditMode(true)
  }

  const handleEdit = () => {
    setEditMode(false)
  }

  const onDel = () => {
    if (!planId) return

    if (window.confirm('정말 삭제하시겠습니까?') === false) return

    deletePlanMutate(Number(planId))
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
            data={planConfirm.periodPlan}
            handleEdit={handleEdit}
            info={planConfirm.info}
            transport={planConfirm.transport}
          />
        ) : (
          <>
            <PlanLeftTab
              onNext={onNext}
              onEdit={onEdit}
              nextText="저장"
              editText="수정"
              period={planConfirm.info.period}
              onDel={onDel}
              planMember={1}
            />
            <LeftItem>
              <Header>
                <Title>{planConfirm.info.title}</Title>
                <Region>{planConfirm.info.province}</Region>
              </Header>
              <PlanListDiv>
                {planList.length > 0 &&
                  planList?.map((item, index) => <PlanConfirmItem index={index} key={index} data={item} />)}
              </PlanListDiv>
            </LeftItem>
          </>
        )}
      </LeftSection>

      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: planConfirm.info.lat,
            lng: planConfirm.info.lng,
          }}
          customMarker={editMode ? [] : markers}
        />
      </RightSection>
    </Container>
  )
}

export default PlanConfirmPage

const Container = styled.div`
  display: flex;
`

const LeftSection = styled(motion.div)`
  display: flex;
  flex: 2;
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
