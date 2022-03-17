import { useSelector } from "react-redux";
import {
  getSingleRecipe,
  addComment,
  deleteComment,
  toggleLike,
} from "../../actions/recipes";
import { getUser } from "../../actions/user";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import { useState, useEffect } from "react";

const RecipeId = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(false);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [likes, setLikes] = useState([]);

  const user = useSelector((state) => state.user);

  const handleLike = async () => {
    const response = await toggleLike(id);
    if (response.user.liked_recipes) {
      setLikes(response.user.liked_recipes);
    }
  };

  const handlePostComment = async () => {
    const response = await addComment(comment, id);
    setShowComment(false);
    setCommentsList(response.recipe.comments);
    setComment("");
  };

  const handleDeleteComment = async (index) => {
    const response = await deleteComment(index, id);
    setCommentsList(response.recipe.comments);
  };

  useEffect(() => {
    async function getServerRecipe(id) {
      if (id !== undefined) {
        const data = await getSingleRecipe(id);
        setRecipe(data.recipe || "none");
        setCommentsList(data.recipe.comments || []);
      }
    }
    getServerRecipe(id);
  }, [id]);

  useEffect(() => {
    async function getServerUser(id) {
      if (id !== "") {
        const data = await getUser(id);
        if (data.user.liked_recipes) {
          setLikes(data.user.liked_recipes);
        }
      }
    }
    getServerUser(user._id);
  }, [user]);

  if (!recipe) {
    return (
      <div className="container">
        <h2 className="text-secondadry">Loading recipe...</h2>
      </div>
    );
  }

  if (recipe === "none") {
    return (
      <div className="container">
        <h2 className="text-secondadry">Recipe not found...</h2>
      </div>
    );
  }

  if (recipe) {
    return (
      <div className="container d-flex flex-wrap justify-content-evenly">
        <div className="col-12 order-1 mb-4 mt-lg-3 mb-lg-5">
          <h2
            className="fs-1 text-primary text-center"
            style={{ fontFamily: "Permanent Marker, cursive" }}
          >
            {recipe.name}
          </h2>
        </div>
        <div className="col-12 order-2 d-flex flex-column mb-5 col-lg-5 order-lg-3 mb-lg-1 justify-content-between">
          <div className="col-12 mb-5 mt-lg-2">
            <div className="container-fluid d-flex justify-content-center">
              <img
                className="img-fluid"
                src={recipe.image.url}
                alt={recipe.name}
              />
            </div>
            <div className="col-11 col-md-8 d-flex justify-content-between mx-auto">
              {user.username === recipe.createdBy ? (
                <Link to={`/recipes/${recipe._id}/edit`}>
                  <button className="btn btn-secondary mt-3">
                    Edit Recipe
                  </button>
                </Link>
              ) : (
                <p className="fs-5 my-auto">
                  More recipes by{" "}
                  <Link to={`/users/${recipe.createdBy}`}>
                    {recipe.createdBy}
                  </Link>
                </p>
              )}
              {user.username !== recipe.createdBy && user.username !== "" && (
                <i
                  className={`bi ${
                    likes.includes(recipe._id) ? "bi-heart-fill" : "bi-heart"
                  } fs-2 text-primary`}
                  onClick={handleLike}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <div className="col-10 col-md-8 mx-auto mb-5 pb-lg-5 pb-xl-1">
            <h2 className="text-center font-monospace text-muted">
              Total Time
            </h2>
            <hr />
            <p
              className="text-center fs-3"
              style={{
                fontFamily: "'Shadows Into Light', cursive",
                letterSpacing: "2px",
              }}
            >
              {recipe.time}
            </p>
          </div>
        </div>
        <div className="col-10 col-md-8 order-3 mx-auto mb-5 col-lg-5 order-lg-2 mx-lg-2">
          <h2 className="text-center font-monospace text-muted">Ingredients</h2>
          <hr />
          <ul
            style={{ listStyleType: "none" }}
            className="px-1 px-sm-5 px-md-0 px-lg-5"
          >
            {recipe.ingredients.map((ingredient, i) => (
              <li
                className="my-2 fs-4 fs-lg-5 d-flex align-items-center"
                key={i}
                style={{
                  fontFamily: "'Shadows Into Light', cursive",
                  letterSpacing: "2px",
                }}
              >
                <div
                  className="bg-primary me-3"
                  style={{ height: "10px", width: "10px", borderRadius: "50%" }}
                ></div>
                {ingredient.text}
                {ingredient.amount && ` - ${ingredient.amount}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 order-4 mb-5 col-lg-9 mx-lg-auto">
          <h2 className="text-center font-monospace text-muted">Directions</h2>
          <hr />
          <ul style={{ listStyleType: "none" }} className="ps-1">
            {recipe.directions.map((direction, i) => (
              <li
                className=" fs-4 my-3 px-2 d-flex"
                key={i}
                style={{
                  fontFamily: "'Shadows Into Light', cursive",
                  letterSpacing: "2px",
                }}
              >
                {recipe.directions.length > 1 && (
                  <div className="text-primary p fw-bolder me-3">{i + 1}.</div>
                )}
                {direction}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 order-5 mx-auto mb-5 col-lg-9 mx-lg-auto">
          <h2 className="text-muted font-monospace">Comments</h2>
          <hr />
          {commentsList.map((comment, i) => (
            <Comment
              comment={comment}
              index={i}
              key={i}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
          {!showComment && user.username && (
            <button
              className="btn btn-primary rounded-circle"
              onClick={() => setShowComment(true)}
            >
              <i className="bi bi-plus h2"></i>
            </button>
          )}
          {showComment && (
            <div className="container">
              <textarea
                className="form-control my-3"
                cols="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="container-fluid d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handlePostComment}>
                  Post
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowComment(false);
                    setComment("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default RecipeId;
