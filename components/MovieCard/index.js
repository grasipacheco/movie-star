import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-primary);
  border-radius: 9px;
  position: relative;
  z-index: 0;

  ul {
    font-size: 12px;
    text-style: none;
    margin-top: 2rem;
  }
`;

const MovieCard = ({
  title,
  release,
  image,
  onToggleFavorite,
  movieInfo,
  id,
}) => {
  const selectedMovie = movieInfo?.find((item) => item.id === id);
  const isFavorite = selectedMovie ? selectedMovie.isFavorite : false;

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    onToggleFavorite();
  };
  return (
    <Wrapper>
      <Image
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt="Movie Poster"
        width={300}
        height={400}
      />
      <FavoriteButton
        ariaLabel="toggle FavoriteButton"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "💙" : "🖤"}
      </FavoriteButton>
      <aside>
        <h3>{title}</h3>
        <h3>{release}</h3>
      </aside>
    </Wrapper>
  );
};

export default MovieCard;
