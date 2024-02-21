import { useState } from 'react'
import styled from 'styled-components'
import PlaceItem from './PlaceItem'
import Input from 'components/shared/Input'
import SearchIcon from 'components/icons/Search'
import { useQuery } from 'react-query'
import { getPlaceApi } from 'api/PlanAPI'
import { PlaceData } from 'interfaces/plan'
import Spinner from 'components/shared/Spinner'

export const categories = [
  { label: '추천', value: 'all' },
  { label: '명소', value: 'tourist_attraction' },
  { label: '음식점', value: 'restaurant' },
  { label: '카페', value: 'cafe' },
  { label: '숙소', value: 'lodging' },
]

const PlaceSelect = ({ region }: { region: string }) => {
  const [search, setSearch] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [places, setPlaces] = useState<PlaceData[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === 'search') {
      setSearch(value)
    }
  }

  const { isLoading } = useQuery(['places', selectedCategory], () => getPlaceApi(selectedCategory, region), {
    onSuccess(data) {
      setPlaces(data)
    },
  })

  const filteredPlaces = places.filter((item) => {
    return item.name.includes(search)
  })

  return (
    <>
      {/* 검색바 */}
      <Search>
        <Input
          value={search}
          style={{ height: '50px', position: 'relative' }}
          name="search"
          onChange={onChange}
          placeholder="장소를 검색하세요"
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
            {item.label}
          </CategoryItem>
        ))}
      </Category>

      {/* 아이템 */}
      <ItemList>
        {isLoading ? (
          <Spinner type="ClipLoader" loading={isLoading} />
        ) : places.length > 0 ? (
          filteredPlaces.map((item) => <PlaceItem key={item.id} data={item} />)
        ) : (
          <div
            style={{
              marginTop: '1rem',
            }}
          >
            장소가 없습니다
          </div>
        )}
      </ItemList>
    </>
  )
}

export default PlaceSelect

const Category = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  box-sizing: border-box;
  position: relative;
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
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
`
