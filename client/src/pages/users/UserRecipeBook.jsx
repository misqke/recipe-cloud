import RecipeCard from "../../components/RecipeCard";
import { getUserRecipes, getLikedRecipes } from "../../actions/recipes";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UsersRecipeBook = () => {
  const [recipes, setRecipes] = useState([]);
  const { creator } = useParams();
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState([]);
  const [homeView, setHomeView] = useState(true);

  const handleViewClick = () => {
    return setHomeView((prev) => !prev);
  };

  useEffect(() => {
    async function getRecipes() {
      const data = await getUserRecipes(creator, user.username);
      setRecipes(data.recipes || false);
    }
    getRecipes();
  }, [creator, user.username]);

  useEffect(() => {
    async function getServerLikes(id) {
      const data = await getLikedRecipes(id);
      setLikes(data.recipes);
    }
    if (user.username === creator) {
      getServerLikes(user._id);
    }
  }, [user, creator]);

  if (!recipes) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "75vh", width: "100vw" }}
      >
        <h2>
          <span className="text-primary">
            {user.username === creator ? "You have" : `${creator} has`}
          </span>{" "}
          no recipies yet
        </h2>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="container-fluid d-flex flex-column mb-3 flex-sm-row justify-content-between">
        <h2
          className="text-muted h1 ms-5 py-2"
          style={{ fontFamily: "Permanent Marker, cursive" }}
        >
          <span className="fst-italic text-primary">
            {user.username === creator ? "Your" : `${creator}'s`}
          </span>
          {homeView ? " recipes" : " favorited recipes"}
        </h2>
        {user.username === creator && (
          <div className="col-12 col-sm-3 d-flex align-items-center">
            <button
              type="button"
              onClick={handleViewClick}
              className="btn btn-primary mx-auto"
              style={{ height: "50%" }}
            >
              {homeView && <i className="bi bi-heart"></i>}{" "}
              {homeView ? " Favorites" : "My Recipes"}
            </button>
          </div>
        )}
      </div>
      <div className="container-fluid d-flex justify-content-center flex-wrap gap-3">
        {homeView
          ? recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                username={user.username}
              />
            ))
          : likes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                username={user.username}
              />
            ))}
      </div>
    </div>
  );
};

export default UsersRecipeBook;
