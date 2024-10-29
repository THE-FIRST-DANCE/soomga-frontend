import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlaceItem from './PlaceItem'
import Input from 'components/shared/Input'
import SearchIcon from 'components/icons/Search'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPlaceApi } from 'api/PlanAPI'
import { PlaceData } from 'interfaces/plan'
import Spinner from 'components/shared/Spinner'
import { useDebounce } from 'hooks/useDebounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLanguage from 'hooks/useLanguage'

export const categories = [
  { label: { 'ko-KR': '추천', 'en-US': 'Recommended', 'ja-JP': 'おすすめ' }, value: 'all' },
  { label: { 'ko-KR': '명소', 'en-US': 'Attractions', 'ja-JP': '観光' }, value: 'tourist_attraction' },
  { label: { 'ko-KR': '음식점', 'en-US': 'Restaurants', 'ja-JP': 'レストラン' }, value: 'restaurant' },
  { label: { 'ko-KR': '카페', 'en-US': 'Cafes', 'ja-JP': 'カフェ' }, value: 'cafe' },
  { label: { 'ko-KR': '숙소', 'en-US': 'Lodging', 'ja-JP': '宿泊' }, value: 'lodging' },
]

const messages = {
  'ko-KR': {
    searchPlaceholder: '장소를 검색하세요',
    noResults: '장소가 없습니다 🫥',
  },
  'en-US': {
    searchPlaceholder: 'Search for a place',
    noResults: 'No places 🫥',
  },
  'ja-JP': {
    searchPlaceholder: '場所を検索',
    noResults: '場所がありません 🫥',
  },
}

const PlaceSelect = ({ region, editMode }: { region: string; editMode?: boolean }) => {
  const [search, setSearch] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [places, setPlaces] = useState<PlaceData[]>([])
  const [language] = useLanguage()
  const message = messages[language]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === 'search') {
      setSearch(value)
    }
  }

  const debounceSearch = useDebounce(search, 1000)

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['places', selectedCategory, region, search],
    queryFn: ({ pageParam = 0 }) => {
      return getPlaceApi(selectedCategory, region, pageParam, debounceSearch)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor
      }
    },
    refetchOnWindowFocus: false,
  })

  const loadmore = () => {
    fetchNextPage()
  }

  useEffect(() => {
    if (data) {
      const newPlaces = data.pages.map((page) => page.items).flat()

      setPlaces(newPlaces)
    }
  }, [data])

  return (
    <>
      {/* 검색바 */}
      <Search>
        <Input
          value={search}
          style={{ height: '50px', position: 'relative' }}
          name="search"
          onChange={onChange}
          placeholder={message.searchPlaceholder}
        ></Input>
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

      {/* 카테고리 */}
      <Category>
        {categories.map((item, index) => (
          <CategoryItem
            key={index}
            onClick={() => setSelectedCategory(item.value)}
            className={selectedCategory === item.value ? 'active' : ''}
          >
            {item.label[language]}
          </CategoryItem>
        ))}
      </Category>

      {/* 아이템 */}
      <ItemList id="scrollableTarget">
        <InfiniteScroll
          dataLength={places.length}
          next={loadmore}
          hasMore={hasNextPage}
          loader={<Spinner type="ClipLoader" loading={isFetching} />}
          scrollableTarget="scrollableTarget"
        >
          {isLoading ? (
            <Spinner type="ClipLoader" loading={isLoading} />
          ) : places.length > 0 ? (
            places.map((place) => <PlaceItem key={place.id} data={place} editMode={editMode} />)
          ) : (
            <div
              style={{
                marginTop: '1rem',
              }}
            >
              {message.noResults}
            </div>
          )}
        </InfiniteScroll>
      </ItemList>
    </>
  )
}

export default PlaceSelect

const Category = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const CategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--bs-black);
  cursor: pointer;

  &.active {
    background-color: var(--color-primary);
    color: #fff;
  }
`

const Search = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
