import React, { useState } from 'react'
import { styled } from 'styled-components'
import { userInfoProps } from './LeftInfo'
import { toast } from 'react-toastify'
const BasicInfo: React.FC<userInfoProps> = ({ name, mail, nickName, phonNum, password }) => {
  const [isFix, setIsFix] = useState<boolean>(false)

  return (
    <>
      <Layout>
        {/* 정보 입력 */}
        {isFix ? (
          <Table>
            <tbody>
              <TableRow>
                <TableCellTitle>이름</TableCellTitle>
                <TableCellContent>
                  <InputTag />
                </TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>이메일</TableCellTitle>
                <TableCellContent>
                  <InputTag />
                </TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>닉네임</TableCellTitle>
                <TableCellContent>
                  <InputTag />
                </TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>연락처</TableCellTitle>
                <TableCellContent>
                  <InputTag />
                </TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>비밀번호</TableCellTitle>
                <TableCellContent>
                  <InputTag />
                </TableCellContent>
              </TableRow>
            </tbody>
          </Table>
        ) : (
          <Table>
            <tbody>
              <TableRow>
                <TableCellTitle>이름</TableCellTitle>
                <TableCellContent>{name}</TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>이메일</TableCellTitle>
                <TableCellContent>{mail}</TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>닉네임</TableCellTitle>
                <TableCellContent>{nickName}</TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>연락처</TableCellTitle>
                <TableCellContent>{phonNum}</TableCellContent>
              </TableRow>
              <TableRow>
                <TableCellTitle>비밀번호</TableCellTitle>
                <TableCellContent>{password}</TableCellContent>
              </TableRow>
            </tbody>
          </Table>
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
  display: flex;
  justify-content: center;
  align-items: center;
`
const Layout = styled(FlexCenterd)`
  width: 100%;
  padding: 2rem 5rem;
  box-sizing: border-box;
  /* background-color: mediumaquamarine; */
`

/* 테이블 */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
const TableRow = styled.tr``
const TableCellTitle = styled.td`
  width: 10rem;
  font-size: 1rem;
  padding: 1.7rem;
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
