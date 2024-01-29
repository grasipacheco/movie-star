import styled from "styled-components";
import Star from "../Star";
import { useState } from "react";
export default function StarRaiting({ maxRating = 10 , rating,setRating }) {
 
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
  }
  return (
    <MainStarContainer>
      <StarContainer>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            onRate={() => handleRating(index + 1)}
            full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
            onHoverIn={() => setTempRating(index + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </StarContainer>
      <p> {tempRating || rating} </p>
    </MainStarContainer>
  );
}

const MainStarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const StarContainer = styled.div`
  display: flex;
  gap: 2px;
`;
