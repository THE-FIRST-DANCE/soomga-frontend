import Router from './Router'

import { reset } from 'styled-reset' // CSS 초기화
import { createGlobalStyle } from 'styled-components' // CSS 초기화
import Layout from 'components/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'react-toastify/dist/ReactToastify.css' // 추가
/* CSS 초기화 */
const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
  @import url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css');

  html, body {
    overscroll-behavior: none;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  /* 임의 폰트 (구글) */
  /* @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');  
  body {
    font-family: 'Black Han Sans', sans-serif;
    
  } */
  
  /* other styles */
  :root {
    --color-primary: #FFD766;
    --color-original: rgba(220, 38, 38, 1);
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-black: #000;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-gray-original: #C1CCD3;
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da;
    --bs-gray-500: #adb5bd;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --bs-gray-800: #343a40;
    --bs-gray-900: #212529;
    --bs-box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    --bs-box-shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --bs-box-shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    --bs-box-shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.075);
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Router />
    </>
  )
}

export default App
