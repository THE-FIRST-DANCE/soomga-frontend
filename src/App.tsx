import Router from './Router'
import Layout from './components/Layout'

import { reset } from 'styled-reset' // CSS 초기화
import { createGlobalStyle } from 'styled-components' // CSS 초기화

/* CSS 초기화 */
const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  :root {
    --color-primary: #FFD766;
  }

`

function App() {
  return (
    <Layout>
      <GlobalStyle />
      <Router />
    </Layout>
  )
}

export default App
