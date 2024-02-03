import Button from 'components/shared/Button'

import { useState } from 'react'
import styled from 'styled-components'
import CreatePlanModal from './CreatePlanModal'

const CreatePlan = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <Container>
      <PlanBox>
        <TravelSvg />
        <CreateBox>
          <CreateBoxTitle>새로운 플래너</CreateBoxTitle>
          <Button
            label="만들기"
            $width="100%"
            $height="40px"
            $color="var(--color-primary)"
            $fontColor="#000"
            $fontSize="16px"
            $fontWeight="700"
            $borderRadius="1rem"
            $boxShadow="var(--bs-box-shadow)"
            onClick={() => setModalOpen(true)}
          />
        </CreateBox>
      </PlanBox>
      <CreatePlanModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
    </Container>
  )
}

export default CreatePlan

const Container = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const PlanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CreateBox = styled.div`
  margin-top: 1.5rem;
`

const CreateBoxTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1rem;
`

// Travel 아이콘 SVG
export const TravelSvg = ({ width, height }: { width?: string; height?: string }) => {
  return (
    <svg
      style={{
        width: width || '64px',
        height: height || '64px',
      }}
      enableBackground="new 0 0 64 64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline fill="#E5E5E5" points="56,22 56,54.5 40,59.5 24,54.5 8,59.5 8,26.5 24,21.8 " />
      <polygon fill="#B7B7B7" points="24,21.8 24,54.5 40,59.5 40,21.9 " />
      <path
        d="M40,40.1c0,0,13.6-9.2,13.6-22.5C53.6,10.1,47.5,4,40,4s-13.6,6.1-13.6,13.6c0,10,6.9,16.7,10.9,20.2  L40,40.1z"
        fill="#FFD766"
      />
      <path
        d="M44.7,11.3c-0.6,0.4-1.6,1.1-2.7,2L33.4,12l-0.6,1.5l6.2,2.2c-1.8,1.5-4,3.3-4,3.3l-1.9-1.4l-0.9,0.8  l2.7,2.7c0,0,10.4-7,12.1-8.3C48.7,11.7,46.6,10.1,44.7,11.3z"
        fill="#4B687F"
      />
      <path
        d="  M44.7,11.3c-0.6,0.4-1.6,1.1-2.7,2L33.4,12l-0.6,1.5l6.2,2.2c-1.8,1.5-4,3.3-4,3.3l-1.9-1.4l-0.9,0.8l2.7,2.7c0,0,10.4-7,12.1-8.3  C48.7,11.7,46.6,10.1,44.7,11.3z"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="33"
        x2="43"
        y1="24"
        y2="24"
      />
      <line
        fill="none"
        stroke="#2C3E50"
        strokeDasharray="0,3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="24"
        x2="24"
        y1="26"
        y2="51"
      />
      <line
        fill="none"
        stroke="#2C3E50"
        strokeDasharray="0,3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="40"
        x2="40"
        y1="56"
        y2="42"
      />
      <polyline
        fill="none"
        points="  56,22 56,54.5 40,59.5 24,54.5 8,59.5 8,26.5 24,21.8 "
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="  M24,22"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="  M40,40.1c0,0,13.6-9.2,13.6-22.5C53.6,10.1,47.5,4,40,4s-13.6,6.1-13.6,13.6c0,10,6.9,16.7,10.9,20.2L40,40.1z"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}
