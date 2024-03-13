import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getPlanById } from 'api/PlanAPI'
import { PlanConfirmListItem, Plans } from 'interfaces/plan'
import { useRecoilValue } from 'recoil'
import { PlanConfirm, PlanConfirmList } from 'state/store/PlanList'
import { provinces } from 'data/region'
import { CurrentPeriod } from 'state/store/PlanInfo'

export const usePlanConfirm = (planId: string | null) => {
  const planConfirmList = useRecoilValue(PlanConfirmList)
  const [confirmList, setConfirmList] = useState<PlanConfirm | null>(null)
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [planList, setPlanList] = useState<PlanConfirmListItem[]>([] as PlanConfirmListItem[])

  useEffect(() => {
    if (confirmList) {
      setPlanList(confirmList.periodPlan[currentPeriod])
    }
  }, [confirmList, currentPeriod])

  const { mutate } = useMutation({
    mutationFn: () => getPlanById(Number(planId)),
    onSuccess: (data: Plans) => {
      const periodPlan: { [key: number]: PlanConfirmListItem[] } = {}

      const lat = provinces.find((item) => item.name === data.region)?.lat
      const lng = provinces.find((item) => item.name === data.region)?.lng

      data.daySchedules.forEach((item) => {
        periodPlan[item.day] = item.schedules
      })

      setConfirmList({
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
    } else {
      setConfirmList(planConfirmList)
    }
  }, [])

  return { confirmList, planList }
}
