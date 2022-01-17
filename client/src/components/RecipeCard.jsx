
import {Link} from 'react-router-dom'
import '../styles/RecipeCard.scss';


const RecipeCard = ({recipe, username}) => {

  return (
    <div className='cardContainer' style={{backgroundImage: `url(${recipe.image.url})`}}>
      <div className='body'>
        <h4 className='text-truncate text-white fst-italic'>{recipe.name}</h4>
        <div className='btnContainer'>
          <Link to={`/recipes/${recipe._id}`}>
            <button className='btn btn-sm btn-primary text-truncate'>View Recipe</button>
          </Link>
          {username === recipe.createdBy ? (
          <Link to={`/recipes/${recipe._id}/edit`}>
            <button className='btn btn-sm btn-secondary'>Edit</button>
          </Link>
          ) : (
          <h6 className='author'>{recipe.createdBy}</h6>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
