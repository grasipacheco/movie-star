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

const StyledImage = styled(Image)`
border-radius: 10px;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
margin-right: 0.8rem; 
font-size: 1.2rem;
`

export default function MovieDetailsPage({ rating, setRating }) {
  const [editReviewId, setEditReviewId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    data: movie,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/movies/${id}` : null, fetcher);

  if (!movie) {
    return;
  }

  function onEditReview(reviewId) {
    setEditReviewId(reviewId);
  }

  const averageRating = movie.localData.reviews
    ?.map((review) => review.rating)
    .reduce(
      (accumulator, currentValue, index, array) =>
        accumulator + currentValue / array.length,
      0
    );

  async function handleCreateReview(data) {
    await fetch(`/api/movies/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: data.review, rating: data.rating }),
    });
    mutate();
  }

  async function handleDeleteReview(idReview) {
    await fetch(`/api/movies/${id}/reviews`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId: idReview }),
    });
    mutate();
  }

  async function handleEditReview(data) {
    await fetch(`/api/movies/${id}/reviews`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        review: data.review,
        rating: data.rating,
        reviewId: data.reviewId,
      }),
    });
    mutate();
    setIsEditMode(false);
  }

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
        />
        <Ul>
          <Title>{movie.title}</Title>
          <List><StyledFontAwesomeIcon icon={faCalendarAlt} /> {movie.release_date} </List>
          <List><StyledFontAwesomeIcon icon={faClock}/>{movie.runtime} min</List>
          <List><StyledFontAwesomeIcon icon={faFilm}/>{movie.genres[0].name} </List>
          <List><FullStar width={15} style={{marginRight: "0.5rem", fontSize: "1.2rem"}}/>TMDB Rating: {movie.vote_average} /10</List>
          <List><FullStar width={15} style={{marginRight: "0.5rem", fontSize: "1.2rem"}}/>User Rating: {averageRating ? averageRating : 0} /10</List>
        </Ul>
        </div>
        <Text>{movie.overview}</Text>
        <Reviews
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          reviews={movie.localData.reviews}
          onEdit={onEditReview}
          movieId={movie.id}
          onDelete={handleDeleteReview}
        />
        <ReviewForm
          isEditMode={isEditMode}
          rating={rating}
          setRating={setRating}
          onSubmit={isEditMode ? handleEditReview : handleCreateReview}
          setIsEditMode={setIsEditMode}
          value={isEditMode ? movie.localData.reviews : ""}
          movieId={movie.id}
          reviewId={editReviewId}
        />
      </MovieDetailsWrapper>
    </div>
  );
}
