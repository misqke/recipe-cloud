import RecipeForm from '../../components/RecipeForm';
import { getSingleRecipe } from '../../actions/recipes';
import React, {useState, useEffect} from 'react'
import { isAuth } from '../../actions/auth'
import {useParams, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditRecipe = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(false);
  const username = useSelector((state) => state.user.username);

  useEffect( () => {
    if (!isAuth()) {
      navigate("/login")
    }
  }, [navigate])

  useEffect( () => {
    async function getServerRecipe (id) {
      const data = await getSingleRecipe(id);
      setRecipe(data.recipe || false);
    }
    getServerRecipe(id);
  }, [id])

  return (
    <div className="container">
      <div className="row justify-content-center">
      <h2 className='text-center mb-3 text-primary' style={{fontFamily: "Permanent Marker, cursive"}}>EDIT RECIPE</h2>
        <div className="col-11 col-md-9">
          {recipe && <RecipeForm recipe={recipe} username={username} update={true} />}
        </div>
      </div>
    </div>
  )
}

export default EditRecipe

