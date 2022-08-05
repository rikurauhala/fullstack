import React from "react";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core";
import { HEALTHBAR_TEXTS } from "../constants";

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<FavoriteIcon fontSize="inherit" />}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
