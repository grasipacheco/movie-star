import styled from "styled-components";
import StarRating from "../StarRating";
import { useState } from "react";
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: bold;
  align-self: flex-start;
`;
const InputText = styled.input`
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  border: none;
  outline: none;
  text-transform: uppercase;
  transition: all 0.3s;
  &:focus {
    box-shadow: 0 0 1.5rem 0.5rem var(--color-primary-light);
    transform: translateY(-2px);
  }
`;
const Button = styled.button`
  cursor: pointer;
  padding: 0.8rem 3.6rem;
  background-color: var(--color-primary);
  border-radius: 9px;
  text-transform: uppercase;
  border: none;
  &:hover {
    background-color: var(--color-primary-light);
  }
`;

const ReviewForm = ({ onSubmit, movieId, isEditMode, reviewId }) => {
  console.log(reviewId);
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const { review, rating } = data;
    const parsedRating = Number(rating);

    if (!data.review.trim() || parsedRating === 0) return;

    setRating(0);
    setTempRating(0);
    event.target.reset();

    if (isEditMode)
      onSubmit({ movieId, reviewId, review, rating: parsedRating });
    else onSubmit({ movieId, review, rating: parsedRating });
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label htmlFor="review">
        {isEditMode ? "Edit Review" : "Add Review"}
      </Label>
      <InputText type="text" id="review" name="review" required />
      <StarRating
        rating={rating}
        setRating={setRating}
        tempRating={tempRating}
        setTempRating={setTempRating}
      />
      <Button type="submit">Send</Button>
    </FormWrapper>
  );
};

export default ReviewForm;
