import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// posts를 임시로 빈 배열로 설정
const posts = [] // 빈 배열로 설정하여 빌드 가능하도록 수정

interface ThProps {
  width: string
}

const PageNation = () => {
  const [currentPage, setCurrentPage] = useState<number>(1) // 현재 페이지
  const navigate = useNavigate()

  const recordsPerPage = 10 // 페이지당 보여줄 데이터 개수
  const lastIndex = currentPage * recordsPerPage // 마지막 index
  const firstIndex = lastIndex - recordsPerPage // 첫 인덱스
  const records = posts.slice(firstIndex, lastIndex) // 나타낼 인덱스
  const nPage = Math.ceil(posts.length / recordsPerPage) // 총 페이지 수
  const numbers = [...Array(nPage + 1).keys()].slice(1) // 1부터 시작하는 페이지 번호

  return (
    <>
      <PageNationStyle>
        <Table>
          <thead>
            <tr>
              <Th width="5%">번호</Th>
              <Th width="300px">제목</Th>
              <Th width="7%">작성자</Th>
              <Th width="12%">작성일</Th>
              <Th width="7%">조회수</Th>
              <Th width="7%">좋아요</Th>
            </tr>
          </thead>
          <tbody>
            {records.map((post) => (
              <tr key={post.id}>
                <Td>{post.id}</Td>
                <Td onClick={() => navigate(`/recommendations/${post.region}/${post.id}`)}>{post.title}</Td>
                <Td>{post.author}</Td>
                <Td>{post.date}</Td>
                <Td>{post.views}</Td>
                <Td>{post.likes}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav>
          <Pagenation_ul>
            {/* 페이지 네비게이션 */}
            {numbers.map((page) => (
              <PageItem_li key={page}>
                <span className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </span>
              </PageItem_li>
            ))}
          </Pagenation_ul>
        </nav>
      </PageNationStyle>
    </>
  )
}

export default PageNation

const PageNationStyle = styled.div``

const Pagenation_ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 20px 0;
`

const PageItem_li = styled.li`
  margin: 0 15px;
  border-radius: 5px;
  &.active {
    color: red;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th<ThProps>`
  border-top: 0.2rem solid #7d7d7d;
  border-bottom: 0.19rem solid #7d7d7d3c;
  width: ${(props) => props.width || 'auto'};
  padding: 20px 10px;
`

const Td = styled.td`
  padding: 8px;
  border-bottom: 0.19rem solid #7d7d7d3c;
  text-align: center;
`
