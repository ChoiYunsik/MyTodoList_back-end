// 전체 스타일을 적용하는 파일
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

// 폰트 스타일, 리셋 등..
const GlobalStyle = createGlobalStyle`
  
  /* 스타일 리셋 */
  ${reset}
  
  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing : border-box;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    line-height: 1.3;
    letter-spacing: -0.5px;
    text-decoration: none;
  }
  input {
    &:focus{
      outline-color: #357DED;
    }
  }
  body {
    font-family: 'SpoqaHanSansNeo-Regular', sans-serif;}

`;

export default GlobalStyle;
