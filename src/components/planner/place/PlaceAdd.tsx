import { PlanInfo } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { useState } from 'react'
import Input from 'components/shared/Input'
import SearchIcon from 'components/icons/Search'
import { getSearchPlaceGoogle } from 'api/PlanAPI'
import GoogleMapLoad from '../GoogleMap'
import { GooglePlace } from 'interfaces/plan'
import PlaceAddItem from './PlaceAddItem'

const PlaceAdd = ({ plan }: { plan: PlanInfo }) => {
  const [search, setSearch] = useState<string>('') // 검색어
  const [searchResult, setSearchResult] = useState<GooglePlace[]>([]) // 검색 결과
  const [center, setCenter] = useState({ lat: plan.lat, lng: plan.lng }) // 지도 중심 좌표

  // 장소 검색
  const handleSearch = async () => {
    const location = plan.lat + ',' + plan.lng

    const response = await getSearchPlaceGoogle(search, location)

    setSearchResult(response.results)
  }

  // 검색 결과 마커
  const markers =
    searchResult && searchResult.map((item) => ({ lat: item.geometry.location.lat, lng: item.geometry.location.lng }))

  const changeCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng })
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
          placeholder="장소를 검색하세요"
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

      <GoogleMapLoad mapContainerStyle={{ width: '100%', height: '15rem' }} center={center} marker={markers} />

      {/* 검색 결과 */}
      <PlaceList>
        {searchResult.length > 0 ? (
          searchResult.map((item, index) => (
            <PlaceAddItem key={index} region={plan.province} item={item} changeCenter={changeCenter} />
          ))
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </PlaceList>
    </Container>
  )
}

export default PlaceAdd

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Search = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const PlaceList = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`
