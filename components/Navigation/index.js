import Link from "next/link";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 100%;
  background-color: grey;
  position: fixed;
  bottom: 0;
`;
const Second = styled.div`
  width: 60%;
  height: 8rem;
  margin-left: 20%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LinkItem = styled(Link)`
  font-size: 3rem;
  text-decoration: none;
  color: white;
  border: none;
  outline: none;
  border-radius: 9px;
  padding: 7px 10px;
  background-color: none;
  cursor: pointer;
  &:focus {
    box-shadow: 0 0 1.5rem 0.5rem var(--color-primary-light);
    transform: translateY(-2px);
  }
`;

export default function Navigation() {
  return (
    <MainDiv>
      <Second>
        <LinkItem href="/">Home</LinkItem>
        <LinkItem href="/favorites">Favorite</LinkItem>
      </Second>
    </MainDiv>
  );
}
