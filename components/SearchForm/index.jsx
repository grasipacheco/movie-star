import { useState } from "react";
import styled from "styled-components";
import Error from "../Error";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
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
  &::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  background-color: var(--color-primary);
  color: var(--color-text);
`;

const SearchForm = ({ onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.title.trim().length === 0) {
      setErrorMessage("Please enter a correct title of Movie");
      return;
    }
    setErrorMessage("");
    onSubmit(data.title);
    event.target.reset();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Search for movie"
        aria-label="Search for movie"
      />
      {errorMessage && <Error message={errorMessage} />}
    </Form>
  );
};

export default SearchForm;
