import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 2.4rem;
  height: auto;
  aspect-ratio: 1;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  border: none;
  position: absolute;
  top: 3.2rem;
  right: 3.2rem;
  z-index: 1;
  border-radius: 25%;
`;

const FavoriteButton = ({ onClick, ariaLabel, children }) => {
  return (
    <StyledButton aria-label={ariaLabel} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default FavoriteButton;
