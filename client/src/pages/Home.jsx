import {useState, useEffect} from 'react';
import { getRecipes } from '../actions/recipes';
import RecipeCard from "../components/RecipeCard";
import { useSelector } from 'react-redux';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const username = useSelector((state) => state.user.username);

  useEffect( () => {
    async function getServerRecipes () {
      const data = await getRecipes(page);
      setRecipes(data.recipes);
      setPages(data.pages)
    };
    getServerRecipes();
  }, [page]);

  return (
    <div className="container-fluid">
      <h2 className='text-muted h1 ms-5 py-2' style={{fontFamily: "Permanent Marker, cursive"}}>Welcome, <span className='text-primary fst-italic'>{username ? username : "Guest"}</span></h2>
      <div className="container-fluid d-flex justify-content-center flex-wrap gap-4 my-4">
        {recipes.map( (recipe) => <RecipeCard key={recipe._id} recipe={recipe} username={username}/>)}     
      </div>
      { pages > 1 && (
      <div className="container d-flex justify-content-around">
        <button className={`btn btn-primary ${pages === 1 && "disabled"}`} onClick={() => setPage((prev) => prev-1)}>
          <i className='bi bi-arrow-left'/>
        </button>
        <p className='my-auto fs-5'>{`${page} of ${pages}`}</p>
        <button className={`btn btn-primary ${page === pages && "disabled"}`} onClick={() => setPage((prev) => prev+1)}>
          <i className='bi bi-arrow-right'/>
        </button>
      </div>)}
    </div>
    )
}

export default Home