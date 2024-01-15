import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
`;

const MovieCard = ({ title, director, image }) => {
  return (
    <Wrapper>
      <Image src={image} alt="Movie Poster" width={150} height={220} />
      <aside>
        <h2>{title}</h2>
        <h3>{director}</h3>
      </aside>
    </Wrapper>
  );
};

export default MovieCard;
