import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
`;

const MovieCard = ({ title, release, image }) => {
  return (
    <Wrapper>
      <Image
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt="Movie Poster"
        width={300}
        height={441}
      />
      <aside>
        <h3>{title}</h3>
        <h3>{release}</h3>
      </aside>
    </Wrapper>
  );
};

export default MovieCard;
