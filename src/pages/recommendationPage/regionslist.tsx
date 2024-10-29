import { useInfiniteQuery } from '@tanstack/react-query'
import { getTouristList } from 'api/TouristAPI'
import TouristCard from 'components/recommendations/TouristCard'
import Spinner from 'components/shared/Spinner'
import { provinces } from 'data/region'
import { motion } from 'framer-motion'
import useLanguage from 'hooks/useLanguage'
import { Tourist } from 'interfaces/tourist'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'

const messages = {
  'ko-KR': {
    searchPlaceholder: '검색',
    write: '글쓰기',
  },
  'en-US': {
    searchPlaceholder: 'Search',
    write: 'Write',
  },
  'ja-JP': {
    searchPlaceholder: '検索',
    write: '書く',
  },
}

const RegionsList = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [touristList, setTouristList] = useState<Tourist[]>([])
  const [language] = useLanguage()
  const message = messages[language]

  let { region_Id } = useParams()
  const region = provinces.find((region) => region.id === Number(region_Id))
  const navigate = useNavigate()

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['tourist', { pageParam: null }],
    queryFn: ({ pageParam }) => {
      return getTouristList({
        pageParam,
        areas: [Number(region_Id)],
      })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor
      }
    },
  })

  useEffect(() => {
    if (data) {
      setTouristList(data.pages.flatMap((page) => page.items))
    }
  }, [data])

  const fetchMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }

  const viewChangeVariants = {
    left: view === 'grid' ? '0%' : '50%',
  }

  return (
    <Layout>
      <RegionTitle>{region.name[language]}</RegionTitle>
      <Header>
        <Search type="text" placeholder={message.searchPlaceholder} />
        <Views>
          <ViewChange initial={false} animate={viewChangeVariants} transition={{ duration: 0.3 }} />
          <IconBox
            onClick={() => {
              setView('grid')
            }}
          >
            <GridIcon />
          </IconBox>
          <IconBox
            onClick={() => {
              setView('list')
            }}
          >
            <ListsIcon />
          </IconBox>
        </Views>
        <WriteButton
          onClick={() => {
            navigate(`/post/create`)
          }}
        >
          {message.write}
        </WriteButton>
      </Header>
      <InfiniteScroll
        dataLength={touristList.length}
        next={fetchMore}
        hasMore={hasNextPage}
        loader={<Spinner loading={isFetching} />}
        style={{ overflow: 'hidden' }}
      >
        <RegionsContainer>
          {touristList.map((tourist) => (
            <TouristCard key={tourist.id} data={tourist} />
          ))}
        </RegionsContainer>
      </InfiniteScroll>
    </Layout>
  )
}

export default RegionsList

const Layout = styled.div`
  margin: 0 auto;
  padding-top: 8rem;
  max-width: 1200px;
`

const RegionTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--bs-gray-300);
`

const Search = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
  margin-right: 1rem;
`

const Views = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bs-gray-200);
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.5rem;
  position: relative;
`

const ViewChange = styled(motion.div)`
  position: absolute;
  width: 50%;
  height: 100%;
  border-radius: 1rem;
  background-color: var(--bs-white);
`

const RegionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 3rem 0;
`

const IconBox = styled.div`
  flex: 1;
  z-index: 1;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WriteButton = styled.div`
  background-color: var(--color-primary);
  color: var(--bs-gray-600);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
`

const GridIcon = () => {
  return (
    <svg width={20} height={20} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
    </svg>
  )
}

const ListsIcon = () => {
  return (
    <svg width={20} height={20} enable-background="new 0 0 32 32" viewBox="0 0 32 32">
      <circle
        cx="5"
        cy="6"
        fill="none"
        id="XMLID_303_"
        r="1"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <circle
        cx="5"
        cy="16"
        fill="none"
        id="XMLID_305_"
        r="1"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <circle
        cx="5"
        cy="26"
        fill="none"
        id="XMLID_304_"
        r="1"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        fill="none"
        id="XMLID_29_"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="10"
        x2="28"
        y1="6"
        y2="6"
      />
      <line
        fill="none"
        id="XMLID_30_"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="10"
        x2="28"
        y1="16"
        y2="16"
      />
      <line
        fill="none"
        id="XMLID_31_"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="10"
        x2="28"
        y1="26"
        y2="26"
      />
    </svg>
  )
}
