import React, {useState} from 'react';
import { login, authenticate } from '../actions/auth';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logInState } from '../redux/userSlice';


const LogInForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    showForm: true
  })

  const {password, username, error, loading, showForm} = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, loading: true, error: false});
    const user = {username, password};
    const data = await login(user);
    if (data.error) {
      setValues({...values, error: data.error, loading: false})
    } else {
      authenticate(data, ()=> {
        dispatch(logInState(data.user));
        navigate(`/`)
      })
    } 
  }

  const handleChange = name => {
    return (e) => {
      setValues({...values, error: false, [name]: e.target.value})
    }
  }

  const showLoading = () => (loading ? <div className='alert alert-info'>Loading...</div> : "");
  const showError = () => (error ? <div className='alert alert-danger'>{error}</div>: "");

  const LoginForm = () => (

      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <input value={username} type="text" className="form-control" placeholder="Username" onChange={handleChange('username')} />
        </div>
        <div className="form-group my-3">
          <input value={password} type="password" className="form-control" placeholder="Password" onChange={handleChange('password')} />
        </div>
        <div>
          <button className="btn btn-primary">Login</button>
        </div>
        <p className='m-4'>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>

  )

  return(
    <>
      {showError()}
      {showLoading()}
      {showForm && LoginForm()}
    </>
  ) 
  
}

export default LogInForm