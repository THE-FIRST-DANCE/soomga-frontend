import React from 'react'
// import { Container, LangeTitle, Wrapper } from '../../../pages/guide/index' // Make sure to provide the correct import path
import { styled } from 'styled-components'
import flag from 'assets/flag2.svg'
import { Container, LangeTitle, Wrapper } from 'pages/guide'
import useLanguage from 'hooks/useLanguage'

const messages = {
  'ko-KR': {
    text: '범위를 정해주세요',
  },
  'en-US': {
    text: 'Please set a range',
  },
  'ja-JP': {
    text: '範囲を設定してください',
  },
}

interface RangeComponentProps {
  title: string
  rangeValues: number[]
  value: number
  name: string
  max: string
  min: string
  step: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RangeComponent: React.FC<RangeComponentProps> = ({
  title,
  rangeValues,
  value,
  name,
  max,
  min,
  step,
  onChange,
}) => {
  const [language] = useLanguage()
  const message = messages[language]

  return (
    <Container>
      <LangeTitle>{title}</LangeTitle>
      <Wrapper>
        <LangeTextWrapper>
          {value != 0 ? (
            <>
              <LangeText>{rangeValues[0]}</LangeText>
              <div>~</div>
              <LangeText>{rangeValues[1]}</LangeText>
            </>
          ) : (
            <LangeText>{message.text}</LangeText>
          )}
        </LangeTextWrapper>
        <InputLange type="range" value={value} name={name} max={max} min={min} step={step} onChange={onChange} />
      </Wrapper>
    </Container>
  )
}

export default RangeComponent

// 횟수
const LangeTextWrapper = styled.div`
  display: flex;
  /* width: 40%; */
  width: 80%;
  justify-content: space-around;
  /* background-color: #6e51e3; */
`

// 범위 텍스트
const LangeText = styled.div`
  display: inline-block;
  border-bottom: 2px solid var(--bs-gray);
  padding-bottom: 7px;
  font-size: 1rem;
  font-weight: 700;
`

// 🟠 input range 🟠
const InputLange = styled.input`
  margin-top: 40px;
  width: 100%;
  height: 3px;
  background: var(--color-original);
  border-radius: 8px;
  outline: none;
  transition: background 450ms ease-in;
  accent-color: var(--color-original);
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    background-color: var(--color-original);
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    background-color: blueviolets;
    height: 25px;
    width: 25px;
    background: url(${flag}) no-repeat center;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -24px;
  }
`
