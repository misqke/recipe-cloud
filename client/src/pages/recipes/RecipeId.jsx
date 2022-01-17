import { useSelector } from 'react-redux';
import { getSingleRecipe, addComment, deleteComment } from '../../actions/recipes';
import {Link, useParams} from 'react-router-dom'
import Comment from '../../components/Comment';
import {useState, useEffect} from 'react';


const RecipeId = () => {

  const {id} = useParams();
  const [recipe, setRecipe] = useState(false);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [commentsList, setCommentsList] = useState(recipe.comments || []);

  const username = useSelector((state) => state.user.username);

  const handlePostComment = async () => {
    const response = await addComment(comment, recipe._id);
    setShowComment(false);
    setCommentsList(response.recipe.comments)
    setComment("");
  }

  const handleDeleteComment = async (index) => {
    const response = await deleteComment(index, recipe._id);
    setCommentsList(response.recipe.comments);
  }

  useEffect( () => {
    async function getServerRecipe (id) {
      if (id !== undefined) {
        const data = await getSingleRecipe(id);
        setRecipe(data.recipe || false);
      }
    }
    getServerRecipe(id);
  }, [id]);


  if (recipe === false) {
    return (
      <div style={{height: "80vh"}} className="container w-100 d-flex justify-content-center align-items-center">
        <h2 style={{fontFamily: "Permanent Marker, cursive"}}>THIS RECIPE DOES NOT EXIST</h2>
      </div>
    )
  }
  if (recipe) {
  return (
    <div className='container py-3'>
      <h1 className='text-center fs-1 mt-3 text-primary' style={{fontFamily: "Permanent Marker, cursive"}}>{recipe.name}</h1>
      <div className="row justify-content-center justify-content-md-between justify-content-xl-around my-5">
        <div className="col-8 col-md-4 order-2 order-md-1 mt-4 mt-md-0">
          <h2 className='text-center font-monospace text-muted'>Ingredients</h2>
          <hr/>
          <ul style={{listStyleType: "none"}}>
            {recipe.ingredients.map( (ingredient,i) => (
            <li className='my-3 fs-5 d-flex align-items-center' key={i} style={{fontFamily: "'Shadows Into Light', cursive", letterSpacing: "2px"}}>
              <div className='bg-primary rounded-circle me-3' style={{height: "10px", width: "10px"}}></div>
              {ingredient.text}{ingredient.amount && ` - ${ingredient.amount}`}
            </li>
              ))}
          </ul>
        </div>
        <div className="col-md-7 col-xl-6 mt-md-4 order-1 order-md-2">
          <div className="container-fluid d-flex flex-column justify-content-center">
            <img className='img-fluid' src={recipe.image.url} alt={recipe.name} />
            { username === recipe.createdBy ? (
            <Link to={`/recipes/${recipe._id}/edit`}>
              <button className='btn btn-primary mt-3'>Edit Recipe</button>
            </Link>
            ) : (
            <p className='h6 my-2 mx-4'>More recipes by <Link to={`/users/${recipe.createdBy}`}>{recipe.createdBy}</Link></p>)}
          </div>
        </div>
      </div>    
      <div className="row my-5 py-3 justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h2 className='text-center font-monospace text-muted'>Directions</h2>
          <hr/>
          <ol style={{listStyleType: "none"}}>
            {recipe.directions.map( (direction, i) => (
            <li className=' fs-5 my-3 px-2 d-flex' key={i} style={{fontFamily: "'Shadows Into Light', cursive", letterSpacing: "2px"}}>
              <div className='text-primary p fw-bolder me-3'>{i+1}.</div>
              {direction}
            </li>
              ))}
          </ol>
        </div>
      </div>
      <div className="container mb-5">
        <h2 className='text-muted font-monospace'>Comments</h2>
        <hr />
        {commentsList.map( (comment, i) => (
          <Comment comment={comment} index={i} key={i} handleDeleteComment={handleDeleteComment}/>
        ))}
        {!showComment && username && (
          <button className='btn btn-primary rounded-circle' onClick={() => setShowComment(true)}><i className="bi bi-plus h2"></i></button>
        )}
        {showComment && (
          <div className="container">
            <textarea className='form-control my-3' cols="4" value={comment} onChange={(e) => setComment(e.target.value)} />
            <div className="container-fluid d-flex justify-content-between">
              <button className='btn btn-primary' onClick={handlePostComment}>Post</button>
              <button className='btn btn-secondary' onClick={() => {setShowComment(false); setComment("")}}>Cancel</button>
            </div>
          </div>

        )}
      </div>      
    </div>
  )}
}

export default RecipeId
