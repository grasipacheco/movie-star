import styled from "styled-components";
import FullStar from "../../public/icons/FullStar.svg";
import EmptyStar from "../../public/icons/EmptyStar.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const StarWrapper = styled.div`
  display: flex;
`;

const textStyle = styled.p`
  line-height: 1;
`;

const InputRating = styled.input`
  display: none;
`;

export default function StarRating({
  rating,
  setRating,
  tempRating,
  setTempRating,
}) {
  return (
    <Wrapper>
      <StarWrapper>
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            key={Math.random()}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          />
        ))}
      </StarWrapper>
      <p>{tempRating || rating || ""}</p>
      <InputRating
        required
        type="number"
        name="rating"
        value={rating}
        onChange={setRating}
      />
    </Wrapper>
  );
}
export const StarStyle = styled.span`
  height: 2.4rem;
  width: 2.4rem;
  display: block;
  cursor: pointer;
`;
function Star({ onClick, full, onMouseEnter, onMouseLeave }) {
  return (
    <StarStyle
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? <FullStar /> : <EmptyStar />}
    </StarStyle>
  );
}
