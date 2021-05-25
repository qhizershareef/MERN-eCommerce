import React from "react";
import PropTypes from "prop-types";

function Rating({ stars, text, color }) {
  return (
    <div className="rating">
      {/* {stars} from {text}. */}
      <span>
        <i
          style={{ color }}
          className={
            stars >= 1
              ? "fas fa-star" //full star
              : stars >= 0.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star" //empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 2
              ? "fas fa-star" //full star
              : stars >= 1.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star" //empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 3
              ? "fas fa-star" //full star
              : stars >= 2.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star" //empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 4
              ? "fas fa-star" //full star
              : stars >= 3.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star" //empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 5
              ? "fas fa-star" //full star
              : stars >= 4.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star" //empty star
          }
        ></i>
      </span>
      <span> &nbsp;{text && text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: "orange",
};

Rating.propTypes = {
  stars: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
