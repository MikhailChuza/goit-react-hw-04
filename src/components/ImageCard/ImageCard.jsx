import PropTypes from "prop-types";
import css from "./ImageCard.module.css";

const ImageCard = ({ imgUrl, imgDescr, onClick }) => {
  return (
    <div className={css["image-card"]} onClick={() => onClick(imgUrl)}>
      <img src={imgUrl} alt={imgDescr} className={css["image-card-img"]} />
    </div>
  );
};

ImageCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgDescr: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
