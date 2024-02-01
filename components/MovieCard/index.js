import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import { useContext } from "react";
import { FavoritesContext } from "@/pages/_app";

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

const MovieCard = ({ movie }) => {
  const { title, release_date, poster_path, id } = movie;

  const { favorites, setFavorites } = useContext(FavoritesContext);

  console.log(favorites);
  console.log(id);

  const isFavorite = favorites.find((favoriteId) => favoriteId === id);

  return (
    <Wrapper>
      <Image
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="Movie Poster"
        width={300}
        height={400}
      />
      <FavoriteButton
        ariaLabel="toggle FavoriteButton"
        onClick={() => console.log(favorites.push(id))}
      >
        {isFavorite ? "💙" : "🖤"}
      </FavoriteButton>
      <ListAside>
        <h3>{title}</h3>
        <h4>{release_date}</h4>
      </ListAside>
    </Wrapper>
  );
};

export default MovieCard;
