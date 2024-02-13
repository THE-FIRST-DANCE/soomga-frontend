import {
  MoonLoader,
  BarLoader,
  ClipLoader,
  SyncLoader,
  PulseLoader,
  FadeLoader,
  BeatLoader,
  DotLoader,
  GridLoader,
} from 'react-spinners'
import styled from 'styled-components'

interface SpinnerProps {
  type?: string
  loading: boolean
}

const override = {
  display: 'block',
  margin: '0 auto',
}

const Spinner = ({ type, loading }: SpinnerProps) => {
  return (
    <Container>
      {type === 'MoonLoader' && <MoonLoader cssOverride={override} size={150} color={'#123abc'} loading={loading} />}
      {type === 'BarLoader' && <BarLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'ClipLoader' && <ClipLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'SyncLoader' && <SyncLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'PulseLoader' && <PulseLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'FadeLoader' && <FadeLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'BeatLoader' && <BeatLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'DotLoader' && <DotLoader cssOverride={override} color={'#123abc'} loading={loading} />}
      {type === 'GridLoader' && <GridLoader cssOverride={override} color={'#123abc'} loading={loading} />}
    </Container>
  )
}

export default Spinner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
