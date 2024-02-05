import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
  position: relative;
  z-index: 0;
`;

const ListAside = styled.section`
  text-decoration: none;
  margin-top: 0.5rem;
  flex-direction: column;
  align-content: space-between;
`;

const MovieCard = ({
  title,
  release,
  image,
  onToggleFavorite,
  id,
  localData,
}) => {
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    onToggleFavorite(localData.isFavorite, localData.movieId);
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
        {localData.isFavorite ? "💙" : "🖤"}
      </FavoriteButton>
      <ListAside>
        <h3>{title}</h3>
        <h4>{release}</h4>
      </ListAside>
    </Wrapper>
  );
};

export default MovieCard;
