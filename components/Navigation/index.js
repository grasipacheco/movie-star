import Link from "next/link";
import styled from "styled-components";
import Home from "../../public/icons/Home.svg";
import Favorites from "../../public/icons/Favorites.svg";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";

const MainDiv = styled.div`
  position: fixed;
  background-color: var(--color-primary-light);
  display: flex;
  padding: 16px;
  width: 100%;
  border-top: 1px solid black;
  bottom: 0;
  height: 50px;
`;

//
// bottom: 0;
// padding: 20px;
// display: flex;
//justify-content: center;
//
// height: 10%;
// left: 0;
//
// const Second = styled.div`
//   width: 60%;
//   height: 8rem;
//   margin-left: 20%;

//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
const LinkItem = styled(Link)`
  font-size: 3rem;
  text-decoration: none;
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
  display: flex;
  align-items: center;
  width: 100%;
  svg {
    color: black;
    margin: 0 auto;
  }
`;

export default function Navigation() {
  return (
    <MainDiv>
      <LinkItem href="/">
        <AiOutlineHome size={40} />
      </LinkItem>
      <LinkItem href="/favorites">
        <AiOutlineHeart size={40} />
      </LinkItem>
    </MainDiv>
  );
}
