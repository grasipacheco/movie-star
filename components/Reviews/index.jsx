import styled from "styled-components";
import FullStar from "../../public/icons/FullStar.svg";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.6rem;
`;
const RatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpdateDeleteWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Reviews = ({ reviews, isEditMode, setIsEditMode, onEdit, onDelete }) => {
  function editHandler(id) {
    setIsEditMode(!isEditMode);
    onEdit(id);
  }

  const displayReview = reviews && reviews?.length !== 0;

  return (
    displayReview && (
      <>
        <H3>Reviews</H3>
        <Wrapper>
          <Ul>
            {reviews?.map((review, index) => (
              <Li key={index}>
                <P>{review.review}</P>
                <RatingWrapper>
                  <FullStar width={24} />
                  <span>{review.rating}</span>
                </RatingWrapper>
                <UpdateDeleteWrapper>
                  <button onClick={() => editHandler(review._id)}>✍</button>
                  <button onClick={() => onDelete(review._id)}>🗑️</button>
                </UpdateDeleteWrapper>
              </Li>
            ))}
          </Ul>
        </Wrapper>
      </>
    )
  );
};

export default Reviews;
