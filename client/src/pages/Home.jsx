import { useState, useEffect } from "react";
import { getRecipes } from "../actions/recipes";
import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const username = useSelector((state) => state.user.username);

  const handlePageClick = (num) => {
    return () => {
      setPage((prev) => prev + num);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setMessage("");
  };

  useEffect(() => {
    async function getServerRecipes() {
      const data = await getRecipes(page, search);
      if (data.recipes) {
        setRecipes(data.recipes);
        setPages(data.pages);
      } else {
        setMessage(data.msg);
        setRecipes([]);
      }
    }
    getServerRecipes();
  }, [page, search]);

  return (
    <div className="container-fluid px-0">
      <div className="container my-4 d-flex flex-column flex-md-row justify-content-between">
        <h2
          className="text-muted h1 ms-5 py-2"
          style={{ fontFamily: "Permanent Marker, cursive" }}
        >
          Welcome,{" "}
          <span className="text-primary fst-italic">
            {username ? username : "Guest"}
          </span>
        </h2>
        <div className="mx-auto mx-md-1">
          <label className="form-label font-monospace" htmlFor="search">
            Search
          </label>
          <div
            className="d-flex align-items-center"
            style={{ position: "relative" }}
          >
            <input
              className="form-control"
              type="text"
              value={search}
              onChange={handleSearchChange}
            />
            <i
              className="bi bi-x fs-3 my-auto text-muted position-absolute"
              style={{ right: "3px", opacity: ".65" }}
              onClick={() => setSearch("")}
            ></i>
          </div>
        </div>
      </div>
      <div className="gap-3 container-fluid d-flex flex-wrap justify-content-center my-3">
        {message && <div className="alert alert-primary">{message}</div>}
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} username={username} />
          ))}
      </div>
      {pages > 1 && (
        <div className="container d-flex justify-content-around my-4">
          <button
            className={`btn btn-primary ${page === 1 && "disabled"}`}
            onClick={handlePageClick(-1)}
          >
            <i className="bi bi-arrow-left" />
          </button>
          <p className="my-auto fs-5">{`${page} of ${pages}`}</p>
          <button
            className={`btn btn-primary ${page === pages && "disabled"}`}
            onClick={handlePageClick(1)}
          >
            <i className="bi bi-arrow-right" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
