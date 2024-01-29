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
  display:flex;
  justify-content:space-evenly
`;
const SpanStar = styled.span`
  width: 2rem;
  height: 2rem;
  display:block;
`;
const RatingStar = styled.span`
 display: flex;
 align-items:center;


`

const Reviews = ({ reviews }) => {
  return (
    <>
      <H3>Reviews</H3>
      <Wrapper>
        <Ul>
          {reviews.map((review, index) => (
            <Li key={index}>
              <P>
                {review.review}  <RatingStar>{review.rating}
                <SpanStar>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="yellow"
                    className="w-1 h-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SpanStar>
                </RatingStar>
              </P>
            </Li>
          ))}
        </Ul>
      </Wrapper>
    </>
  );
};

export default Reviews;
