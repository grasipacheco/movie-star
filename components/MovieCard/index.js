import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  padding: 2.4rem;
  /* background-color: var(--color-background-500); */
  border-radius: 1rem;
  position: relative;
  z-index: 0;
  background-color: #5473a1;
  box-shadow: 4px 4px #8c8c8c;
`;

const MovieTitle = styled.h3`
  /* position: absolute;
  bottom: 100px;
  /* left: 50%; */
  /* padding: 8px;
  margin: 0;
  transform: translateX(-50%); */
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
  voteAverage,
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
        border-radius="10px"
      />
      <FavoriteButton
        ariaLabel="toggle FavoriteButton"
        onClick={handleFavoriteClick}
        isFavorite={isFavorite}
      />
      <ListAside>
        <MovieTitle>{title}</MovieTitle>
        <h3><FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: "0.8rem", fontSize: "1.2rem"}}/>{release}</h3>
      </ListAside>
    </Wrapper>
  );
};

export default MovieCard;
