import GlobalStyle from "../styles";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default function App({ Component, pageProps }) {
  const [movieInfo, setMovieInfo] = useState([]);
  const [query, setQuery] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: movies,
    isLoading,
    mutate,
  } = useSWR(
    `/api/movies?search=${query || "Jack+Reacher"}`,

    fetcher
  );

  console.log(movies);

  async function handleToggle(isFavorite, movieId) {
    await fetch(`/api/movies/toggleFavorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, isFavorite }),
    });
    mutate();
  }

  // async function handleRevieww(isFavorite, movieId) {
  //   await fetch(`/api/movies/toggleFavorite`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ movieId, isFavorite }),
  //   });
  //   mutate();
  // }

  async function handleReview(data) {
    // await fetch(`/api/movies/${}.reviews`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ review: data.review, rating: data.review }),
    // });
    // mutate();
    // const { movieId: selectedId, review, rating } = data;
    // const selectedMovie = movieInfo.find((movie) => movie.id === selectedId);
    // if (selectedMovie) {
    //   setMovieInfo(
    //     movieInfo.map((item) =>
    //       item.id === selectedId
    //         ? item.reviews
    //           ? {
    //               ...item,
    //               reviews: [...item.reviews, { review, rating, id: uuidv4() }],
    //             }
    //           : { ...item, reviews: [{ review, rating, id: uuidv4() }] }
    //         : item
    //     )
    //   );
    // } else {
    //   setMovieInfo([
    //     ...movieInfo,
    //     {
    //       id: selectedId,
    //       isFavorite: false,
    //       reviews: [{ review, rating, id: uuidv4() }],
    //     },
    //   ]);
    // }
  }

  function handleEdit(data) {
    const { movieId: selectedId, review: reviewText, rating, reviewId } = data;
    setIsEditMode(false);

    setMovieInfo(
      movieInfo.map((movie) =>
        movie.id === selectedId
          ? {
              ...movie,
              reviews: movie.reviews.map((review) =>
                review.id === reviewId
                  ? { review: reviewText, rating, id: reviewId }
                  : review
              ),
            }
          : movie
      )
    );
  }
  function handleDelete(reviewId, movieId) {
    setMovieInfo(
      movieInfo.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              reviews: movie.reviews.filter((review) => review.id !== reviewId),
            }
          : movie
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          {...pageProps}
          onToggleFavorite={handleToggle}
          movieInfo={movieInfo}
          movies={movies}
          query={query}
          setQuery={setQuery}
          onSubmit={handleReview}
          onEdit={handleEdit}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onDelete={handleDelete}
        />
      </Layout>
    </>
  );
}
