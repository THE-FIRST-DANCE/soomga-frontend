import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { planInfo } from 'recoil/atoms/PlanInfo'

const useCreatePlan = () => {
  const [province, setProvince] = useState<string>('시/도')
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
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
      lat,
      lng,
    })

    navigate('/planner/create')
  }

  return {
    province,
    setProvince,
    openProvince,
    setOpenProvince,
    setEndTime,
    onChange,
    createPlan,
    setLat,
    setLng,
  }
}

export default useCreatePlan
