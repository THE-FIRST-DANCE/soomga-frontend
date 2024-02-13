import { useState } from 'react'
import styled from 'styled-components'
import PlaceItem from './PlaceItem'
import Input from 'components/shared/Input'
import SearchIcon from 'components/icons/Search'
import { useQuery } from 'react-query'
import { getPlaceApi } from 'api/PlanAPI'
import { PlaceData } from 'interfaces/plan'
import Spinner from 'components/shared/Spinner'
import Button from 'components/shared/Button'
import SelectTransportation from '../SelectTransportation'

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
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  const nextButton = () => {
    setIsOpen(true)
  }

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
      {isLoading ? (
        <Spinner type="ClipLoader" loading={isLoading} />
      ) : places.length > 0 ? (
        filteredPlaces.map((item) => <PlaceItem key={item.placeId} data={item} />)
      ) : (
        <div
          style={{
            marginTop: '1rem',
          }}
        >
          장소가 없습니다
        </div>
      )}

      {/* 푸터 */}
      <Footer>
        <Button
          label="취소"
          $width="10vw"
          $height="3rem"
          $color="var(--bs-gray-200)"
          $fontColor="var(--bs-black)"
          $hasBorder
          $borderColor="var(--bs-black)"
          $borderRadius="0.5rem"
        />
        <Button
          label="확인"
          $width="10vw"
          $height="3rem"
          $color="var(--color-primary)"
          $fontColor="var(--bs-black)"
          $hasBorder
          $borderColor="var(--bs-black)"
          $borderRadius="0.5rem"
          onClick={nextButton}
        />
      </Footer>

      <SelectTransportation isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
    </>
  )
}

export default PlaceSelect

const Category = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  position: relative;
`

const CategoryItem = styled.div`
  border-radius: 5px;
  padding: 0.3rem 0.5rem;
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

const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  bottom: 0;
  left: 0;
  background-color: #fff;
`
