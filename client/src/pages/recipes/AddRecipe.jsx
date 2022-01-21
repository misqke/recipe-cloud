import React, {useEffect} from 'react'
import RecipeForm from '../../components/RecipeForm'
import { isAuth } from '../../actions/auth'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';

const AddRecipe = () => {

  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  useEffect( () => {
    if (!isAuth()) {
      navigate('/login');
    }
  }, [navigate])

  return (
    <div className="container">
      <div className="row justify-content-center">
      <h2 className='text-center mb-3 text-primary' style={{fontFamily: "Permanent Marker, cursive"}}>CREATE RECIPE</h2>
        <div className="col-11 col-md-9">
          <RecipeForm username={username} />
        </div>
      </div>
    </div>
  )
}

export default AddRecipe