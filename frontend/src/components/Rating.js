import React from "react";

const Rating = ({ value, text, color = "#f8e825" }) => {
  const ratingStars = Array.from({ length: 5 }).map((_, i) => {
    function getStar() {
      if (i + 1 <= value) {
        return "fas fa-star";
      } else if (i + 0.5 <= value) {
        return "fas fa-star-half-alt";
      } else {
        return "far fa-star";
      }
    }

    const star = getStar();

    return <i className={star} style={{ color }} />;
  });
  return (
    <div>
      <span>{ratingStars}</span>
      <span style={{ marginLeft: 10 }}>{text}</span>
    </div>
  );
};

export default Rating;
