import { posts } from 'pages/recommendationPage/regionslist'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

interface ThProps {
  width: string
}

const PageNation = () => {
  const [currentPage, setCurrentPage] = useState<number>(1) // 현재 페이지

  const navigate = useNavigate()

  //!   5 x N
  const recordsPerPage = 10 // 페이지당 보여줄 데이터 개수
  const lastIndex = currentPage * recordsPerPage // 마지막 index
  const firstIndex = lastIndex - recordsPerPage // 첫 인덱스
  const records = posts.slice(firstIndex, lastIndex) // 나타낼 인덱스 -> slice는 마지막 -1 까지 반환  0..9  10..19
  const nPage = Math.ceil(posts.length / recordsPerPage) // 총 페이지 수 -> 딱 나눠 떨어 지지 않으면 무조건 올림
  const numbers = [...Array(nPage + 1).keys()].slice(1) // 1부터 시작하는 페이지 번호

  /* < : prev page*/
  const prevPage = (e: any) => {
    e.preventDefault()
    setCurrentPage((prev) => Math.max(1, prev - 1)) // 첫 페이지 이전으로 가지 않도록 조정 : 페이지 번호가 0이나 음수되면 데이터가 안나온는데 보여주더라
  }

  /* > : next page */
  const nextPage = (e: any) => {
    e.preventDefault()
    setCurrentPage((prev) => Math.min(nPage, prev + 1)) // 마지막 페이지를 넘어가지 않도록 조정
  }

  const changeCPage = (e: any, n: number) => {
    e.preventDefault()
    setCurrentPage(n)
  }

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
                <Td onClick={() => navigate(`/recommendations/${post.region} /${post.id}`)}>{post.title}</Td>
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
            <PageItem_li>
              <a className="page-link" onClick={(e) => prevPage(e)}>
                ＜
              </a>
            </PageItem_li>

            {/* 1부터 페이지 번호 시작 */}
            {numbers.map((page) => (
              <PageItem_li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
                <span className="page-link" onClick={(e) => changeCPage(e, page)}>
                  {page}
                </span>
              </PageItem_li>
            ))}
            <PageItem_li>
              <a className="page-link" onClick={(e) => nextPage(e)}>
                ＞
              </a>
            </PageItem_li>
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
  li {
  }
  a {
    display: block;
    padding: 8px 12px;
    text-decoration: none;
    color: black;
    &:hover {
      color: black;
    }
  }
`
const PageItem_li = styled.li`
  margin: 0 15px;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    /* background-color: #f4f4f4; */
    /* color: var(--color-original); */
  }
  &.active {
    /* background-color: #007bff; */
    /* color: white; */
    color: var(--color-original);
    color: red;
  }
`

// 테이블

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th<ThProps>`
  border-top: 0.2rem solid #7d7d7d;
  border-bottom: 0.19rem solid #7d7d7d3c;
  /* background-color: #f4f4f4; */
  width: ${(props) => props.width || 'auto'};
  padding: 20px 10px;
  /* border: 1px solid #ddd; */
`

const Td = styled.td`
  padding: 8px;
  /* border: 1px solid #ddd; */
  border-bottom: 0.19rem solid #7d7d7d3c;
  text-align: center;
`
