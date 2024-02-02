import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { planInfo } from 'recoil/atoms/PlanInfo'

const useCreatePlan = () => {
  const [province, setProvince] = useState<string>('시/도')
  const [openProvince, setOpenProvince] = useState<boolean>(false)

  const [planTitle, setPlanTitle] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  const setPlanInfo = useSetRecoilState(planInfo)

  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'planTitle') {
      setPlanTitle(value)
    }

    if (name === 'startTime') {
      setStartTime(value)
    }

    if (name === 'endTime') {
      setEndTime(value)
    }
  }

  const createPlan = () => {
    setPlanInfo({
      title: planTitle,
      province,
      startTime,
      endTime,
    })

    navigate('/planner/create')
  }

  return {
    province,
    setProvince,
    openProvince,
    setOpenProvince,
    planTitle,
    setPlanTitle,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    onChange,
    createPlan,
  }
}

export default useCreatePlan
