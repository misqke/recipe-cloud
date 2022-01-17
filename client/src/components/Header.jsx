import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { isAuth, logout } from '../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { logInState, logOutState } from '../redux/userSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(logOutState());
    logout( () => navigate("/login"))
  }

  useEffect( () => {
    const user = isAuth();
    if (user) {
      dispatch(logInState(user));
    } else {
      dispatch(logOutState());
    }
  }, [dispatch])

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top px-3 px-md-5 py-3 justify-content-between mb-4">
      <Link to="/" className="navbar-brand fs-3" style={{fontFamily: "Permanent Marker, cursive"}}>Recipe Cloud</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse text-center" id="collapsibleNavbar">  
        {username && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className='nav-link' to="/recipes/add">Add Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to={`/users/${username}`}>My Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/login" onClick={handleLogout}>Log Out</Link>
            </li>
          </ul>
        )}
        {!username && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className='nav-link' to="/login">Log In</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/signup">Sign Up</Link>
            </li>
          </ul>
          )}
      </div>
    </nav>
  )
}

export default Header
