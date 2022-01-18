import React, {useState} from 'react';
import { addRecipe, updateRecipe, deleteRecipe } from '../actions/recipes';
import { useNavigate } from 'react-router-dom';
import Ingredient from './Ingredient';
import Direction from './Direction';


const RecipeForm = ({username, recipe, update}) => {

  const navigate = useNavigate();

  // set states
  const [showDelete, setShowDelete] = useState(false);
  const [preview, setPreview] = useState('');

  const [values, setValues] = useState({
    _id: recipe?._id || null,
    name: recipe?.name || "",
    time: recipe?.time || "",
    ingredients: recipe?.ingredients || [{text:"", amount: ""}],
    directions: recipe?.directions || [""],
    image: {
      url: recipe?.image?.url || "/no-img-icon.png",
      id: recipe?.image?.id || ""
    },
    file: null,
    error: "",
    message: "",
    loading: false,
    showForm: true
  })

  // destructure state
  const {name, time, ingredients, directions, image, error, message, loading, showForm, _id,} = values;

  // component functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, loading: true, message: update ? "Updating recipe..." : "Creating recipe...", showForm: false});
    const filteredIngredients = ingredients.filter((ingredient) => ingredient.text.length > 0);
    const filteredDirections = directions.filter((direction) => direction.length > 0)
    const recipeToSubmit = {name, time, ingredients: filteredIngredients, directions: filteredDirections, image};
    if (update) {recipeToSubmit._id = _id}
    if (preview) {
      recipeToSubmit.image.url = preview;
    }
    const recipeFunction = update ? updateRecipe : addRecipe;
    const newRecipe = await recipeFunction(recipeToSubmit);
    if (newRecipe.error) {
      setValues({...values, error: newRecipe.error.error || newRecipe.error.message || newRecipe.error, loading: false, showForm: true})
    } else {
      setValues({...values, loading: false, message: newRecipe.msg})
      navigate(`/recipes/${newRecipe.recipe._id}`)
    }   
  }

  const handleShowDelete = (e, bool) => {
    e.preventDefault();
    setShowDelete(bool);
  }

  const handleDelete = async () => {
    setValues({...values, loading: true, message: "Deleteing recipe...", showForm: false});
    await deleteRecipe(_id);
    setValues({...values, loading: false});
    navigate(`/users/${username}`);
  }

  const handleChange = name => {
    return (e) => {
      setValues({...values, error: false, [name]: e.target.value})
    }
  }

  const handleFileChange = (e) => {
    setValues({...values, error: false, file: null})
    const newFile = e.target.files[0];
    setValues({...values, error: false, file: newFile})
    previewFile(newFile);
    
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    }
  }

  

  // ingredient functions
  const addIngredient = () => {
    setValues({...values, ingredients: [...values.ingredients, {text: "", amount: ""}]})
  }

  const handleDeleteIngredient = (index) => {
    return (e) => {
      const newIngredientList = [...ingredients];
      newIngredientList.splice(index,1);
      setValues({...values, ingredients: newIngredientList})
    }
  }

  const handleIngredientChange = (index, property) => {
    return (e) => {
      const targetIngredient = ingredients[index];
      const newIngredient = {...targetIngredient, [property]: e.target.value}
      const newIngredientList = [...ingredients.slice(0,index), newIngredient, ...ingredients.slice(index+1)]
      setValues({...values, ingredients: newIngredientList})
    }
  }

  // directions functions
  const addDirection = () => {
    setValues({...values, directions: [...values.directions, ""]})
  }

  const handleDirectionsChange = (index) => {
    return (e) => {
      const newDirection = e.target.value;
      const newDirectionsList = [...directions.slice(0,index), newDirection, ...directions.slice(index+1)];
      setValues({...values, directions: newDirectionsList})
    }
  }

  const handleDeleteDirection = (index) => {
    return (e) => {
      const newDirectionsList = [...directions];
      newDirectionsList.splice(index,1);
      setValues({...values, directions: newDirectionsList})
    }
  }

  // recipe form

  const showLoading = () => (loading ? <div className='alert alert-info'>{message}</div> : "");
  const showError = () => (error ? <div className='alert alert-danger'>{error}</div>: "");

  const RecipeForm = () => {
    return (
      <div className='container-fluid position-relative d-flex flex-column justify-content-center'>
          <form onSubmit={handleSubmit} className="row g-3 mb-5" method='post' encType="multipart/form-data">

            <div className="col-md-12">
              
              <div className='row justify-content-center'>
                <div className="col-sm-7 my-2 d-flex justify-content-center align-items-center">
                  <img  src={!preview ? image.url : preview} alt={name} className='img-fluid border border-primary border-5' style={{borderRadius: "12px"}} />
                </div>
              </div>
              <label htmlFor="image" className="form-label font-monospace">Image</label>
              <input type="file" className='form-control' name="image" id="image" accept="image/png, image/jpeg" onChange={handleFileChange} />
            </div>
    
            <div className="col-md-12">
              <label htmlFor="name" className="form-label font-monospace">Recipe Name</label>
              <input type="text" id="name" value={name} onChange={handleChange('name')} placeholder='recipe name' className="form-control" />
            </div>
    
            <div className="col-md-12">
              <label htmlFor="time" className="form-label font-monospace">Make Time</label>
              <input type="text" id="time" value={time} onChange={handleChange('time')} placeholder='make time' className="form-control" />
            </div>
    
            <div className="container">
              <label className='form-label font-monospace'>Ingredients</label>
              {ingredients.map( (ingredient, index) => <Ingredient key={index} index={index} ingredient={ingredient} handleChange={handleIngredientChange} handleClick={handleDeleteIngredient} />)}
            </div>
            <button type='button' className='btn btn-primary' onClick={addIngredient}>Add Ingredient</button>
    
            <div className="container">
              <label className='form-label font-monospace'>Directions</label>
              {directions.map( (direction, index) => <Direction key={index} index={index} direction={direction} handleChange={handleDirectionsChange} handleClick={handleDeleteDirection} />)}
            </div>
            <button type='button' className='btn btn-primary' onClick={addDirection}>Add Direction</button>
    
            
          <div className='d-flex justify-content-between'>
            <button type="submit" className="btn btn-primary my-3">{update ? "Update" : "Create"} Recipe</button>
            {update && (
            <button onClick={(e) => handleShowDelete(e,true)} className="btn btn-danger my-3"><i className='bi bi-trash'></i></button>)}
          </div>        
        </form>
        {showDelete && (
        <div className="row position-absolute bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center bg-white  p-4 p-md-5">
          <h5>Deleting is permanent, are you sure you want to delete?</h5>
          <div className=' container d-flex justify-content-around'>
            <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
            <button onClick={() => setShowDelete(false)} className='btn btn-secondary'>Cancel</button>
          </div>
        </div>)}
      </div>
    ) 
  }

  return (
    <>
      {showError()}
      {showLoading()}
      {showForm && RecipeForm()}
    </>
  )
}

export default RecipeForm
