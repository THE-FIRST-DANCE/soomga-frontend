import React, { useState } from 'react'
import styled from 'styled-components'
import logo from 'assets/logo.svg'
import { useRecoilState } from 'recoil'
import { ModalAtom } from 'state/store/ModalAtom'
const EmailModal = () => {
  const [isModal, setIsModal] = useRecoilState(ModalAtom)

  const [isClick, setisClick] = useState({
    email: false,
    AuthNum: false,
  })

  const closeModal = () => {
    setIsModal({ ...isModal, isOpen: false })
  }

  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          {/* 탑 */}
          <Top>
            <Logo>
              <img src={logo} alt="" />
            </Logo>
          </Top>
          {/* 메인 */}
          <Main>
            <Title>이메일 변경</Title>

            {/* 1. 기존 이메일 */}
            <InputContainer>
              <InputTitle>기존 이메일</InputTitle>
              <Input />
            </InputContainer>

            {/* 2. 변경할 이메일 */}
            <InputContainer>
              <InputTitle>변경할 이메일</InputTitle>
              <Wrapper>
                <Input placeholder="변경할 이메일을 입력하세요" />
                <BasicBtn>인증</BasicBtn>
              </Wrapper>
            </InputContainer>

            {/* 3. 인증 번호*/}
            <InputContainer>
              <InputTitle>인증 번호</InputTitle>
              <Wrapper>
                <Input placeholder="인증번호를 입력하세요" />
                <BasicBtn>확인</BasicBtn>
              </Wrapper>
            </InputContainer>

            {/* 4. 취소 ・ 확인  버튼 */}
            <SubmitBtnWrapper>
              <DecisionBtn onClick={closeModal}>취소</DecisionBtn>
              <DecisionBtn>확인</DecisionBtn>
            </SubmitBtnWrapper>
          </Main>
        </ModalContainer>
      </ModalWrapper>
    </>
  )
}

export default EmailModal

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`
const ModalContainer = styled.div`
  width: 50rem;
  height: 48rem;
  background-color: white;
  border-radius: 0.5rem;
  /* padding: 1rem; */
`
const Top = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: var(--color-original);
`

const Logo = styled.div`
  /* background-color: #fff; */
  width: 15rem;
  height: 10rem;
  object-fit: cover;
  display: flex; // 이미지를 가운데 정렬하기 위해 추가할 수 있습니다.
  justify-content: center;
  align-items: center;

  &img {
    width: 100%;
    height: auto;
  }
`

const Main = styled.div`
  width: 70%;
  margin: auto;
  height: 40rem;
  /* background-color: #5599ff; */
  padding: 2rem 0;
  box-sizing: border-box;
`
const Title = styled.div`
  font-size: 2rem;
  border-bottom: 5px solid var(--color-original);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`
const InputContainer = styled.div`
  width: 100%;
  /* background-color: mediumaquamarine; */
  margin-top: 3rem;
  padding: 10px;
  box-sizing: border-box;
`

const InputTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Input = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  background-color: #fafafa;
  padding: 1rem;
  box-sizing: border-box;
`
const BasicBtn = styled.button`
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  background-color: transparent;
  /* background-color: #fafafa; */
  /* padding: 1rem;
  box-sizing: border-box; */
  cursor: pointer;

  &:active {
    background-color: #e9e9e9;
  }
`
const SubmitBtnWrapper = styled(FlexCenterd)`
  width: 100%;
  gap: 3rem;
  margin-top: 3rem;
`

const DecisionBtn = styled(BasicBtn)`
  background-color: var(--color-original);
  color: white;

  &:active {
    background-color: white;
    color: var(--color-original);
    border: none;
  }
`
