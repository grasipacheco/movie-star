import { useRouter } from "next/router";

import Image from "next/image";
import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";
import StyledLink from "@/components/styledLink";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const updater = (url, method, data) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

const MovieDetailsWrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
  position: relative;
  z-index: 0;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: justify;
  margin: 1.5rem auto;
`;

const Ul = styled.ul`
  display: inline-grid;
  justify-content: flex-end;
  float: right;
  align-content: stretch;
`;

const List = styled.li`
  font-size: 12px;
  list-style: none;
  text-align: justify;
  display: flex;
`;

const Title = styled.li`
  font-size: 15px;
  list-style: none;
  display: flex;
`;

export default function MovieDetailsPage() {
  const [editReviewId, setEditReviewId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher
  );

  // TODO: update the api resource path
  // TODO: move .review.id
  const { data: reviews, isLoadingReviews } = useSWR(
    id ? `/api/reviews/${id}` : null,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const handleSubmitReview = (data) => {
    if (isEditMode) {
      updater(`/api/reviews/${id}`, "PUT", {
        rating: Number(data.rating),
        review: data.review,
        reviewId: data.reviewId,
      }).then(() => {
        mutate(`/api/reviews/${id}`);
      });
      return;
    }
    updater(`/api/reviews/${id}`, "POST", {
      rating: Number(data.rating),
      review: data.review,
    }).then(() => {
      mutate(`/api/reviews/${id}`);
    });

    setIsEditMode(false);
  };

  if (isLoading || isLoadingReviews) {
    return <>loading...</>;
  }

  // TODO: fix when the id is invalid
  if (!movie) {
    return <>movie not found</>;
  }

  function onEditReview(reviewId) {
    setEditReviewId(reviewId);
  }

  function handleDelete(reviewId) {
    updater(`/api/reviews/${id}`, "DELETE", {
      reviewId,
    }).then(() => {
      console.log("success");
      mutate(`/api/reviews/${id}`);
    });
  }

  const averageRating = reviews
    ?.map((review) => review.rating)
    .reduce(
      (accumulator, currentValue, index, array) =>
        accumulator + currentValue / array.length,
      0
    );

  return (
    <>
      <MovieDetailsWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Movie Poster"
          width={150}
          height={220}
        />
        <Ul>
          <Title>{movie.title}</Title>
          <List>{movie.release_date}</List>
          <List>{movie.runtime} min</List>
          <List>{movie.genres[0].name}</List>
          <List>TMDB Rating: {movie.vote_average}</List>
          <List>User Rating: {averageRating ? averageRating : 0}</List>
        </Ul>
        <Text>{movie.overview}</Text>
        <Reviews
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          reviews={reviews}
          onEdit={onEditReview}
          movieId={movie.id}
          onDelete={handleDelete}
        />
        <ReviewForm
          isEditMode={isEditMode}
          rating={rating}
          setRating={setRating}
          onSubmit={handleSubmitReview}
          setIsEditMode={setIsEditMode}
          value={isEditMode ? reviews : ""}
          movieId={movie.id}
          reviewId={editReviewId}
        />
        <StyledLink href="/">Home</StyledLink>
      </MovieDetailsWrapper>
    </>
  );
}
