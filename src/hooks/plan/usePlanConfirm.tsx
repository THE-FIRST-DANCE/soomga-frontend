import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getPlanById } from 'api/PlanAPI'
import { PlanConfirmListItem, Plans } from 'interfaces/plan'
import { useRecoilState } from 'recoil'
import { PlanConfirm, PlanConfirmList } from 'state/store/PlanList'
import { provinces } from 'data/region'
import { useParams } from 'react-router-dom'

export const usePlanConfirm = () => {
  const { planId } = useParams<{ planId: string }>()
  const [planConfirmList, setPlanConfirmList] = useRecoilState(PlanConfirmList)
  const [planConfirm, setPlanConfirm] = useState<PlanConfirm>(planConfirmList)

  const { mutate } = useMutation({
    mutationFn: () => getPlanById(Number(planId)),
    onSuccess: (data: Plans) => {
      const periodPlan: { [key: number]: PlanConfirmListItem[] } = {}

      const lat = provinces.find((item) => item.name === data.region)?.lat
      const lng = provinces.find((item) => item.name === data.region)?.lng

      data.daySchedules.forEach((item) => {
        periodPlan[item.day] = item.schedules
      })

      setPlanConfirm({
        periodPlan,
        transport: data.transport,
        info: {
          title: data.title,
          province: data.region,
          lat: lat || 0,
          lng: lng || 0,
          period: data.period,
        },
      })

      setPlanConfirmList({
        periodPlan,
        transport: data.transport,
        info: {
          title: data.title,
          province: data.region,
          lat: lat || 0,
          lng: lng || 0,
          period: data.period,
        },
      })
    },
  })

  useEffect(() => {
    if (planId) {
      mutate()
    }
  }, [planId, mutate])

  useEffect(() => {
    setPlanConfirm(planConfirmList)
  }, [planConfirmList])

  return {
    planConfirm,
  }
}
