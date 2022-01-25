import { useState, useEffect } from "react";
import { getRecipes, searchRecipes } from "../actions/recipes";
import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  // const [search, setSearch] = useState("");
  // const [message, setMessage] = useState("");
  const username = useSelector((state) => state.user.username);

  const handlePageClick = (num) => {
    return () => {
      setPage((prev) => prev + num);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
  };

  // const handleSearch = async () => {
  //   const data = await searchRecipes(search);
  //   if (data.data) {
  //     setRecipes(data.data);
  //   } else {
  //     setMessage(data.msg);
  //   }
  // };

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  //   setMessage("");
  // };

  useEffect(() => {
    async function getServerRecipes() {
      const data = await getRecipes(page);
      setRecipes(data.recipes);
      setPages(data.pages);
    }
    getServerRecipes();
  }, [page]);

  return (
    <div className="container-fluid px-0">
      <h2
        className="text-muted h1 ms-5 py-2"
        style={{ fontFamily: "Permanent Marker, cursive" }}
      >
        Welcome,{" "}
        <span className="text-primary fst-italic">
          {username ? username : "Guest"}
        </span>
      </h2>
      {/* <div className="container d-flex justify-content-center">
        <div>
          <label className="form-label" htmlFor="search">
            Search
          </label>
          <input
            className="form-control"
            type="text"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-primary"
          >
            Search
          </button>
          {message && <div className="alert alert-primary">{message}</div>}
        </div>
      </div> */}
      <div className="gap-3 container-fluid d-flex flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => (
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
