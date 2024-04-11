import Arrow from 'components/icons/Arrow'
import Time from 'components/icons/Time'
import { CarIcon } from 'components/planner/SelectTransportation'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import seoul from '../../assets/seoul.png'
import busan from '../../assets/busan.png'
import ulsan from '../../assets/ulsan.png'
import React from 'react'
const plans = [
  {
    seoul: [],
    locations: [1, 2, 3],
  },
  {
    seoul: [],
    locations: [1, 2, 3, 4],
  },
]

const Planing = () => {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean[]>([])

  const onClickDropdownBtn = (index: number) => {
    setIsPlanOpen((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]

      return newState
    })
  }

  const initPlanStates = () => {
    setIsPlanOpen(Array(3).fill(false))
  }

  useEffect(() => {
    initPlanStates()
  }, [plans.length])

  return (
    <Layout>
      <Title>🚩 기억하고 싶은 플랜! </Title>
      <PlanOutsideWrapper>
        <PlanContainer>
          {plans.map((plan, index) => {
            return (
              <>
                <PlanWrapper>
                  {/* 🟡 플랜 바 */}
                  <Plan key={index} onClick={() => onClickDropdownBtn(index)}>
                    <PlanTitle>{`플랜1`}</PlanTitle>
                    <PlanInfo>{`서울에서 하는 조선시대 역사 체험`}</PlanInfo>
                    <PlanTime>
                      <Time $width="1.1rem" $height="1.1rem" $color="white" />
                      {` 총 ${6} 시간`}
                    </PlanTime>
                    <DropdownBtn>
                      {isPlanOpen[index] ? (
                        <Arrow $width="3rem" $height="3rem" $color="white" $angle="90deg" />
                      ) : (
                        <Arrow $width="3rem" $height="3rem" $color="white" $angle="180deg" />
                      )}
                    </DropdownBtn>
                  </Plan>

                  {/* 🟡 플랜 내용 토굴로 펼쳐지는 부분 🟡 */}
                  <PlanContent isPlanOpen={isPlanOpen[index]}>
                    {plan.locations.map((location, index) => {
                      return (
                        <React.Fragment key={index}>
                          <ContentFrame>
                            <LocationImage>
                              <img src={ulsan} alt="Noimage" />
                            </LocationImage>
                            <LocationInfoContainer>
                              <InfoTime>
                                <Time $width="1rem" $height="1rem" $color="black" />
                                {1} 시간
                              </InfoTime>
                              <InfoName>
                                <Place>장소</Place>
                                <PlaceName> {`83타워`}</PlaceName>
                              </InfoName>
                            </LocationInfoContainer>
                            <Description>
                              efiluwahwflihawlefiluwaheiuflhawflihawliefhwialuawflihawliefhwialuhefiluwaheiuflhawflihawliefhwialuhefiluwaheiuflhawflihawliefhwialuhefiluwaheiuflhaweuilfhlawiehfuiawh
                            </Description>
                          </ContentFrame>

                          {index !== plan.locations.length - 1 && (
                            <TravelTime>
                              <CarIcon width="30px" height="30px" marginRight="10px" />
                              {`${30} 분  `}
                            </TravelTime>
                          )}
                        </React.Fragment>
                      )
                    })}
                    {/* --------------------------------------------------------- */}
                  </PlanContent>
                </PlanWrapper>
              </>
            )
          })}
        </PlanContainer>
      </PlanOutsideWrapper>
    </Layout>
  )
}

export default Planing

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layout = styled(FlexCenterd)`
  width: 100%;
  padding: 0.5rem;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  /* background-color: #bc7de9; */
`

/* 🟣🟣🟣🟣🟣 플랜 🟣🟣🟣🟣🟣*/
const Title = styled.div`
  width: 100%;
  /* background-color: #bc7de9; */
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 3rem;
  margin-left: 15rem;
`

// const PlanOutsideWrapper = styled(FlexCenterd)`
const PlanOutsideWrapper = styled.div`
  width: 100%;
  height: 23rem;
  /* padding: 1rem;
  box-sizing: border-box; */
  overflow: auto;
  /* background-color: mediumaquamarine; */
`

const PlanContainer = styled(FlexCenterd)`
  /* background-color: #6bf37f; */
  gap: 4rem;
  width: 100%;
  flex-direction: column;
  /* box-sizing: border-box; */
  border-radius: 0.5rem;
`
const PlanWrapper = styled(PlanContainer)`
  width: 70%;
  /* background-color: yellow; */
`
const Plan = styled(FlexCenterd)`
  background-color: var(--color-original);
  width: 100%;
  height: 3rem;
  /* border: 3px solid black; */
  box-shadow: 4px 4px 4px #a2a1a1;
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  justify-content: flex-start;
  cursor: pointer;
  z-index: 2;
  /* position: relative; */
  color: white;
  /* gap: 1rem; */
`
const PlanTitle = styled.div`
  width: 40%;
  font-size: 1rem;
  margin-right: 1rem;
`
const PlanInfo = styled.div`
  width: 150%;
  /* background-color: #f5c951; */
  margin-right: 3rem;
  font-size: 1rem;
`
const PlanTime = styled.div`
  width: 90%;
  font-size: 1rem;
`
const DropdownBtn = styled(FlexCenterd)`
  width: 100%;
  justify-content: flex-end;
`

const PlanContent = styled.div<{ isPlanOpen: boolean }>`
  display: ${({ isPlanOpen }) => (isPlanOpen ? 'block' : 'none')};
  /* visibility: ${({ isPlanOpen }) => (isPlanOpen ? 'block' : 'none')}; */
  /* background-color: #408efb; */
  width: 95%;
  min-height: 10rem;
  border: 3px solid black;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  /* top: ${({ isPlanOpen }) => (isPlanOpen ? '0' : '-6rem')}; */
  top: -4rem;
  opacity: ${({ isPlanOpen }) => (isPlanOpen ? '1' : '0')};
  transition: top 0.7s ease;
`
const ContentFrame = styled(FlexCenterd)`
  /* background-color: #ffed4e; */
  /* margin: 1rem 0; */
  min-width: 100%;
  justify-content: space-around;
  /* min-height: 10rem; */
`

const TravelTime = styled(ContentFrame)`
  justify-content: flex-start;
  padding-left: 5rem;
  box-sizing: border-box;
  margin: 1rem 0;
  position: relative;
  /* background-color: blue; */

  &::after {
    content: '';
    position: absolute;
    display: block;
    /* left: 0px; */
    top: 1.7rem;
    left: 6.5rem;
    /* left: 0.5rem; */
    width: 1px;
    height: 20px;
    background-color: black;
    border: 1px solid black;
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    /* left: 0px; */
    top: -1.4rem;
    left: 6.5rem;
    /* left: 0.5rem; */
    width: 1px;
    height: 20px;
    background-color: black;
    border: 1px solid black;
  }
`

const LocationImage = styled(FlexCenterd)`
  width: 10rem;
  height: 8rem;
  overflow: hidden;
  border-radius: 0.8rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const LocationInfoContainer = styled(FlexCenterd)`
  flex-direction: column;
  gap: 1rem;
  /* background-color: blue; */
`

const InfoTime = styled(FlexCenterd)`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
  /* background-color: #7af060; */
`

const InfoName = styled(FlexCenterd)`
  width: 100%;
  margin-bottom: 1rem;
  flex-direction: column;
`
const Place = styled.div`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`
const PlaceName = styled.div`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
`

const Description = styled.div`
  background-color: #90909026;
  height: 10rem;
  width: 17rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 0.7rem;
  border-radius: 0.5rem;
  overflow: auto;
  overflow-wrap: break-word;
  line-height: 1.3rem;
  /* word-break: break-all; */
  /* white-space: nowrap; */
`
