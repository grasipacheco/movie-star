import styled from "styled-components";

const H3 = styled.h3`
  font-size: 2rem;
`;

const Wrapper = styled.div`
  margin: 1.6rem 0;
  padding: 1.6rem;
  border-radius: 9px;
  box-shadow: 0 0 2rem 1.2rem var(--color-primary);
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  background-color: var(--color-background-100);
  border-radius: 9px;
  margin-bottom: 0.8rem;
  padding: 0.8rem 1.6rem;
`;

const P = styled.p`
  font-size: 1.6rem;
`;

const Reviews = ({ reviews }) => {
  return (
    <>
      <H3>Reviews</H3>
      <Wrapper>
        <Ul>
          {reviews.map((review, index) => (
            <Li key={index}>
              <P>{review}</P>
            </Li>
          ))}
        </Ul>
      </Wrapper>
    </>
  );
};

export default Reviews;
