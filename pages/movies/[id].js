import { useRouter } from "next/router";

import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import FullStar from "../../public/icons/FullStar.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


const fetcher = (url) => fetch(url).then((res) => res.json());

const MovieDetailsWrapper = styled.div`
  background-color: #001f3f;
  /* border-radius: 9px;
  position: relative; */
  z-index: 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  font-size: 14px;
  text-align: justify;
  margin: 1.5rem auto;
`;

const Ul = styled.ul`
  /* display: inline-grid;
  justify-content: flex-start;
  align-content: right; */
  /* flex: 1; */
  /* display: flex;
  flex-direction: column; */
  float: right;
  justify-content: flex-start;
`;

const List = styled.li`
  font-size: 12px;
  list-style: none;
  text-align: justify;
  display: flex;
  margin-bottom: 8px;
`;

const Title = styled.li`
  font-size: 1.8rem;
  list-style: none;
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;
`;

export default function MovieDetailsPage({
  onSubmit,
  movieInfo,
  rating,
  setRating,
  onEdit,
  isEditMode,
  setIsEditMode,
  onDelete,
}) {
  const [editReviewId, setEditReviewId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher
  );

  if (!movie) {
    return;
  }

  function onEditReview(reviewId) {
    setEditReviewId(reviewId);
  }

  const reviews = movieInfo.find((item) => item.id === movie.id)?.reviews;

  const averageRating = reviews
    ?.map((review) => review.rating)
    .reduce(
      (accumulator, currentValue, index, array) =>
        accumulator + currentValue / array.length,
      0
    );

  return (
    <div>
      <PageTitle>MovieStar</PageTitle>
      <MovieDetailsWrapper>
       <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Movie Poster"
          width={150}
          height={220}
          border-radius="10px"
        />
        <Ul>
          <Title>{movie.title}</Title>
          <List><FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: "0.8rem", fontSize: "1.2rem"}}/> {movie.release_date} </List>
          <List><FontAwesomeIcon icon={faClock} style={{marginRight: "0.8rem", fontSize: "1.2rem"}}/>{movie.runtime} min</List>
          <List><FontAwesomeIcon icon={faFilm} style={{marginRight: "0.8rem", fontSize: "1.2rem"}}/>{movie.genres[0].name} </List>
          <List><FullStar width={15} style={{marginRight: "0.5rem", fontSize: "1.2rem"}}/>TMDB Rating: {movie.vote_average} /10</List>
          <List><FullStar width={15} style={{marginRight: "0.5rem", fontSize: "1.2rem"}}/>User Rating: {averageRating ? averageRating : 0} /10</List>
        </Ul>
        </div>
        <Text>{movie.overview}</Text>
        <Reviews
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          reviews={reviews}
          onEdit={onEditReview}
          movieId={movie.id}
          onDelete={onDelete}
        />
        <ReviewForm
          isEditMode={isEditMode}
          rating={rating}
          setRating={setRating}
          onSubmit={isEditMode ? onEdit : onSubmit}
          setIsEditMode={setIsEditMode}
          value={isEditMode ? reviews : ""}
          movieId={movie.id}
          reviewId={editReviewId}
        />
      </MovieDetailsWrapper>
    </div>
  );
}
