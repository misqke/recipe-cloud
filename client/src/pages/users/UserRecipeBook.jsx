import RecipeCard from '../../components/RecipeCard';
import {getUserRecipes} from '../../actions/recipes'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';


const UsersRecipeBook = () => {

  const [recipes, setRecipes] = useState([]);
  const {creator} = useParams();
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    async function getRecipes () {
      const data = await getUserRecipes(creator);
      setRecipes(data.recipes || false);
    };
    getRecipes();
  }, [creator])

  if (!recipes) {
    return (
      <div className='container d-flex justify-content-center align-items-center' style={{height: "75vh", width: "100vw"}}>
        <h2><span className='text-primary'>{creator}</span> has no recipies yet</h2>
      </div>
    )
  }

  return (
    <div className="container-lg">
      <h2 className='text-muted h1 ms-5 py-2' style={{fontFamily: "Permanent Marker, cursive"}}><span className='fst-italic text-primary'>{creator}'s</span> recipes</h2>
      <div className="container-fluid d-flex justify-content-center flex-wrap gap-4 mt-4">
        {recipes.map( (recipe) => <RecipeCard key={recipe._id} recipe={recipe} username={username} />)}     
      </div>
    </div>
  )
}

export default UsersRecipeBook

