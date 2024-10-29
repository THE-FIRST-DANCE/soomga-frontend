import { PlanInfo } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Input from 'components/shared/Input'
import SearchIcon from 'components/icons/Search'
import { getSearchPlaceGoogle } from 'api/PlanAPI'
import GoogleMapLoad from '../GoogleMap'
import { GooglePlace } from 'interfaces/plan'
import PlaceAddItem from './PlaceAddItem'
import Spinner from 'components/shared/Spinner'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLanguage from 'hooks/useLanguage'

const messages = {
  'ko-KR': {
    searchPlaceholder: '장소를 검색하세요',
    noResults: '검색 결과가 없습니다',
  },
  'en-US': {
    searchPlaceholder: 'Search for a place',
    noResults: 'No results found',
  },
  'ja-JP': {
    searchPlaceholder: '場所を検索',
    noResults: '検索結果がありません',
  },
}

const PlaceAdd = ({ plan }: { plan: PlanInfo }) => {
  const [search, setSearch] = useState<string>('') // 검색어
  const [searchResult, setSearchResult] = useState<GooglePlace[]>([]) // 검색 결과
  const [executeSearch, setExecuteSearch] = useState<boolean>(false) // 검색 실행 여부
  const [center, setCenter] = useState({ lat: plan.lat, lng: plan.lng }) // 지도 중심 좌표
  const [language] = useLanguage()
  const message = messages[language]

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['places', plan.province, search],
    queryFn: ({ pageParam = null }) => {
      return getSearchPlaceGoogle({
        query: search,
        location: `${plan.lat},${plan.lng}`,
        pagetoken: pageParam,
      })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.next_page_token) {
        return lastPage.next_page_token
      }
    },
    refetchOnWindowFocus: false,
    enabled: executeSearch,
  })

  const handleSearch = () => {
    setExecuteSearch(true)
  }

  useEffect(() => {
    setExecuteSearch(false)
  }, [data, isFetching])

  useEffect(() => {
    if (data) {
      const newPlaces = data.pages.map((page) => page.results).flat()
      setSearchResult(newPlaces)
    }
  }, [data])

  // 검색 결과 마커
  const markers =
    searchResult && searchResult.map((item) => ({ lat: item.geometry.location.lat, lng: item.geometry.location.lng }))

  const changeCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng })
  }

  const loadmore = () => {
    fetchNextPage()
  }

  return (
    <Container>
      {/* 검색바 */}
      <Search>
        <Input
          value={search}
          style={{ height: '50px', position: 'relative' }}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          fuc={handleSearch}
          placeholder={message.searchPlaceholder}
        />
        <SearchIcon
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '55%',
            right: '1rem',
            transform: 'translateY(-50%)',
          }}
        />
      </Search>

      <GoogleMapLoad mapContainerStyle={{ width: '100%', height: '10rem' }} center={center} marker={markers} />

      <PlaceList id="scrollableTarget">
        <InfiniteScroll
          dataLength={searchResult.length}
          next={loadmore}
          hasMore={hasNextPage}
          loader={<Spinner type="ClipLoader" loading={isFetching} />}
          scrollableTarget="scrollableTarget"
        >
          {searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <PlaceAddItem key={index} region={plan.province} item={item} changeCenter={changeCenter} />
            ))
          ) : (
            <div>{message.noResults}</div>
          )}
        </InfiniteScroll>
      </PlaceList>
    </Container>
  )
}

export default PlaceAdd

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`

const Search = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const PlaceList = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;
`
