import styled from 'styled-components'
import logo from '../../assets/footerLogo.svg'
const Footer = () => {
  return (
    // 전체 Layout div
    <FooterContainer_div>
      {/* 중앙 잉미지 */}
      <ImageWrapper>
        <img src={logo} alt="FooterLogo" />
      </ImageWrapper>
    </FooterContainer_div>
  )
}

export default Footer

/* ----------------------------- 💅 StyledComponent -----------------------------*/

const FooterContainer_div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: var(--color-original);
`

const ImageWrapper = styled.div`
  width: 300px;
  height: auto;
  img {
    width: 90%;
    height: 90%;

    object-fit: cover; /* 필요에 따라 object-fit 속성을 조절할 수 있습니다 */
  }
`
