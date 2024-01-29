import styled from "styled-components";
import StarRaiting from "../StarRating";
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

const ReviewForm = ({ onSubmit, rating, setRating,handleAverageRating }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Label htmlFor="review">Add Review</Label>
      <InputText type="text" id="review" name="review" required   />
      <StarRaiting rating={rating} setRating={setRating} />
      <Button type="submit" onClick={handleAverageRating}>Send</Button>
    </FormWrapper>
  );
};

export default ReviewForm;
