import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  padding: 1.8rem;
  /* background-color: var(--color-background-500); */
  border-radius: 1rem;
  position: relative;
  z-index: 0;
  background-color: #5473a1;
  box-shadow: 0.5rem 0.5rem var(--color-background-200);
`;

const MovieTitle = styled.h3`
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
`;

const ListAside = styled.section`
  text-decoration: none;
  flex-direction: column;
  align-content: space-between;
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
        position="relative"
        style={{
          borderRadius: 10,
        }}
      />
      <FavoriteButton
        ariaLabel="toggle FavoriteButton"
        onClick={handleFavoriteClick}
        isFavorite={isFavorite}
      />
      <ListAside>
        <MovieTitle>{title}</MovieTitle>
        <h3>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ marginRight: "0.8rem", fontSize: "1.2rem" }}
          />
          {release}
        </h3>
      </ListAside>
    </Wrapper>
  );
};

export default MovieCard;
