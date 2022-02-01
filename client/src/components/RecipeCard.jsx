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
          <div>
            {username === recipe.createdBy ? (
              <Link to={`/recipes/${recipe._id}/edit`}>
                <button className="btn btn-sm btn-secondary py-0 px-3">
                  Edit
                </button>
              </Link>
            ) : (
              <h6 className="author">{recipe.createdBy}</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
