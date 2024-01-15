import GlobalStyle from "../styles";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  );
}
