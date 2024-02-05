import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const StyledButton = styled.button`
  margin-top: 8px;
  cursor: pointer;
  background: none;
  position: absolute;
  top: 30px;
  right: 40px;
  border: none;
  svg {
    font-size: 2rem;
  }
`;

const FavoriteButton = ({ onClick, ariaLabel, isFavorite }) => {
  return (
    <StyledButton aria-label={ariaLabel} onClick={onClick}>
      {isFavorite ? (
        <AiFillHeart color="red"/>
      ) : (
        <AiOutlineHeart style={{ strokeWidth: 50, color: "red" }}/>
      )}
    </StyledButton>
  );
};

export default FavoriteButton;
