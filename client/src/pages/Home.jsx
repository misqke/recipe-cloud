import {useState, useEffect} from 'react';
import { getRecipes } from '../actions/recipes';
import RecipeCard from "../components/RecipeCard";
import { useSelector } from 'react-redux';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const username = useSelector((state) => state.user.username);

  useEffect( () => {
    async function getServerRecipes () {
      const data = await getRecipes();
      setRecipes(data.recipes);
    };
    getServerRecipes();
  }, []);

  return (
    <div className="container-lg">
      <h2 className='text-muted h1 ms-5 py-2' style={{fontFamily: "Permanent Marker, cursive"}}>Welcome, <span className='text-primary fst-italic'>{username ? username : "Guest"}</span></h2>
      <div className="container-fluid d-flex justify-content-center flex-wrap gap-4 my-4">
        {recipes.map( (recipe) => <RecipeCard key={recipe._id} recipe={recipe} username={username} />)}     
      </div>
    </div>
  )
}

export default Home;