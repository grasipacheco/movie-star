import Navigation from "../Navigation";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Layout({ children }) {
  return (
    <Main>
      {children}
      <Navigation />;
    </Main>
  );
}
