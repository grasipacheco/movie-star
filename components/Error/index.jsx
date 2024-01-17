import styled from "styled-components";

const ErrorContainer = styled.div`
  color: red;
  background-color: var(--color-error-background);
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem 0;
  font-size: 1.6rem;
`;

const Error = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default Error;
