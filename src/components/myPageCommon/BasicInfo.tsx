import React, { useState } from 'react'
import { styled } from 'styled-components'
import { userInfoProps } from './LeftInfo'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationUserInfoEditSchema } from 'utils/validationSchema'
import { useRecoilState } from 'recoil'
import { ModalAtom } from 'state/store/ModalAtom'

interface UserInfoType {
  email: string
  nickname: string
  phonNum: string
  password?: string
  repassword: string
}

const BasicInfo: React.FC<userInfoProps> = ({ name, email, nickname, phonNum, password }) => {
  const [isFix, setIsFix] = useState<boolean>(false) // 가이드 정보 수정 상태 확인
  const hiddenPassword = '*'.repeat(password?.length || 0) // 비밀번호 * 처리
  const [isOpenModal, setIsOpenModal] = useRecoilState(ModalAtom) // 모달 상태

  // ✏️ 닉네임
  const [nicknameVal, setnicknameVal] = useState<string>(`${nickname}`)
  // ✏️ 연락처
  const [phoneVal, setPhoneVal] = useState<string>(`${phonNum}`)
  // ✏️ 비밀번호
  const [newPassword, setNewPassword] = useState<string>('') // 첫 번째 비번 : 입력한 비밀번호 같은지 확인
  const [checkNewPassword, setCheckNewPassword] = useState<string>('') // 두 번째 비번 : 입력한 비밀번호 같은지 확인

  // 비밀번호 유효성 검사
  const userInfoEditForm = useForm<UserInfoType>({
    mode: 'onChange',
    resolver: zodResolver(validationUserInfoEditSchema),
  })

  /* TODO: 이메일 버튼 누른 후 성공 했다는 토스트 알리기 */
  const handleEmailFix = () => {
    setIsOpenModal((isOpenModal) => ({ ...isOpenModal, isOpen: !isOpenModal.isOpen }))
  }

  return (
    <>
      <Layout>
        {/* 정보 입력 */}
        {isFix ? (
          <Table>
            <tbody>
              {/* 🟠 이메일 */}
              <TableRow>
                <TableCellTitle>이메일</TableCellTitle>
                <TableCellContent>
                  <EmailInput
                    value={email}
                    placeholder="이메일 입력하세요..."
                    {...userInfoEditForm.register('email')}
                  />
                  <p style={{ color: 'var(--color-original)', marginTop: '1rem' }}>
                    {userInfoEditForm.formState.errors.email?.message as React.ReactNode}
                  </p>
                </TableCellContent>
                <EmailBtn
                  onClick={() => {
                    handleEmailFix()
                  }}
                >
                  변경
                </EmailBtn>
              </TableRow>

              {/* 🟠 닉네임 */}
              <TableRow>
                <TableCellTitle>닉네임</TableCellTitle>
                <TableCellContent>
                  <NickNameInput
                    value={nicknameVal}
                    placeholder="닉네임을 입력하세요..."
                    {...userInfoEditForm.register('nickname')}
                    onChange={(e) => setnicknameVal(e.target.value)}
                  />
                  <p style={{ color: 'var(--color-original)', marginTop: '1rem' }}>
                    {userInfoEditForm.formState.errors.nickname?.message as React.ReactNode}
                  </p>
                </TableCellContent>
              </TableRow>

              {/* 🟠 연락처 */}
              <TableRow>
                <TableCellTitle>연락처</TableCellTitle>
                <TableCellContent>
                  <PhoneInput
                    value={phoneVal}
                    placeholder="연락처를 입력하세요..."
                    onChange={(e) => setPhoneVal(e.target.value)}
                  />
                </TableCellContent>
              </TableRow>

              {/* 🟠 기존 비밀번호 */}
              <TableRow>
                <TableCellTitle>기존 비밀번호</TableCellTitle>
                <TableCellContent>
                  <PasswordInput type="password" value={password} placeholder="Password를 입력하세요..." />
                </TableCellContent>
              </TableRow>

              {/* 🟠 새 비밀번호 */}
              <TableRow>
                <TableCellTitle>새 비밀번호</TableCellTitle>
                <TableCellContent>
                  <PasswordInput
                    type="password"
                    placeholder="Password를 입력하세요..."
                    {...userInfoEditForm.register('password')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNewPassword(e.target.value)
                    }}
                  />
                  <p style={{ color: 'var(--color-original)', marginTop: '1rem' }}>
                    {userInfoEditForm.formState.errors.password?.message as React.ReactNode}
                  </p>
                </TableCellContent>
              </TableRow>

              {/* 🟠 비밀번호 확인 */}
              <TableRow>
                <TableCellTitle>비밀번호 확인</TableCellTitle>
                <TableCellContent>
                  <RePasswordInput
                    type="password"
                    placeholder="Password를 다시 입력하세요..."
                    {...userInfoEditForm.register('repassword')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCheckNewPassword(e.target.value)
                    }}
                  />
                  <p style={{ color: 'var(--color-original)', marginTop: '1rem' }}>
                    {userInfoEditForm.formState.errors.repassword?.message as React.ReactNode}
                  </p>
                  {/* 비밀번호가 일치하지 않을 시  */}
                  {newPassword !== checkNewPassword && (
                    <p style={{ color: 'var(--color-original)' }}>* Password가 일치하지 않습니다! </p>
                  )}
                </TableCellContent>
              </TableRow>
            </tbody>
          </Table>
        ) : (
          <FlexCenterd>
            <Table>
              <tbody>
                {/* <TableRow>
                <TableCellTitle>이름</TableCellTitle>
                <TableCellContent>{name}</TableCellContent>
              </TableRow> */}
                <TableRow>
                  <TableCellTitle>이메일</TableCellTitle>
                  <TableCellContent>{email}</TableCellContent>
                </TableRow>
                <TableRow>
                  <TableCellTitle>닉네임</TableCellTitle>
                  <TableCellContent>{nickname}</TableCellContent>
                </TableRow>
                <TableRow>
                  <TableCellTitle>연락처</TableCellTitle>
                  <TableCellContent>{phonNum}</TableCellContent>
                </TableRow>
                <TableRow>
                  <TableCellTitle>비밀번호</TableCellTitle>
                  <TableCellContent>{hiddenPassword}</TableCellContent>
                </TableRow>
              </tbody>
            </Table>
          </FlexCenterd>
        )}
      </Layout>
      {/* 수정 */}
      {isFix ? (
        <>
          <SubmitBtn
            onClick={() => {
              setIsFix(!isFix)
              toast.success('회원정보가 수정 되었습니다')
            }}
          >
            완료
          </SubmitBtn>
        </>
      ) : (
        <>
          <SubmitBtn onClick={() => setIsFix(!isFix)}>수정</SubmitBtn>
        </>
      )}
    </>
  )
}

export default BasicInfo

const FlexCenterd = styled.div`
  width: 100%;
  height: 29rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: magenta; */
`
const Layout = styled.div`
  width: 100%;
  height: 31rem;
  overflow: auto;
  padding: 1rem 5rem;
  margin-bottom: 0.3rem;
  box-sizing: border-box;
  /* background-color: mediumaquamarine; */
`

/* 테이블 */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* background-color: rebeccapurple; */
`
const TableRow = styled.tr``
const TableCellTitle = styled.td`
  /* width:100%; */
  font-size: 1rem;
  padding: 1.3rem;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`

const TableCellContent = styled(TableCellTitle)`
  font-size: 1rem;
`

// 버튼
const SubmitBtn = styled.div`
  font-size: 1.2rem;
  color: var(--color-original);
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const InputTag = styled.input`
  width: 100%;
  height: 1.5rem;
  border: 0.1rem solid var(--color-original);
  border-radius: 0.2rem;
  padding: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`

const EmailBtn = styled(SubmitBtn)`
  font-size: 1rem;
  color: var(--color-original);

  &:hover {
    transform: translateX(5px);
    transition: all 0.3s;
  }
`
const EmailInput = styled(InputTag)``
const NickNameInput = styled(InputTag)``
const PhoneInput = styled(InputTag)``
const PasswordInput = styled(InputTag)``
const RePasswordInput = styled(InputTag)``
