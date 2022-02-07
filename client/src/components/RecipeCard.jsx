import { Link } from "react-router-dom";
import "../styles/RecipeCard.scss";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, username }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  return (
    <div className="outerContainer">
      <div
        onClick={handleClick}
        className="cardContainer"
        style={{
          backgroundImage: `url(${recipe.image.url})`,
          cursor: "pointer",
        }}
      >
        <div className="body">
          <h5
            className="text-white text-truncate"
            style={{ fontFamily: "Permanent Marker, cursive" }}
          >
            {recipe.name}
          </h5>

          <h6 className="author">{recipe.createdBy}</h6>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
