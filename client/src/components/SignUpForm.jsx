import React, {useState} from 'react';
import { signup } from '../actions/auth';
import {Link, useNavigate} from 'react-router-dom';


const SignUpForm = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    showForm: true
  })

  const {username, name, password, email, error, loading, showForm} = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, loading: true, error: false});
    const user = {username, name, email, password};
    const data = await signup(user);
    if (data.error) {
      setValues({...values, error: data.error, loading: false})
    } else {
      navigate('/login')
    }

      

  }

  const handleChange = name => {
    return (e) => {
      setValues({...values, error: false, [name]: e.target.value})
    }
  }

  const showLoading = () => (loading ? <div className='alert alert-info'>Creating Account...</div> : "");
  const showError = () => (error ? <div className='alert alert-danger'>{error}</div>: "");


  const SignupForm = () => (

      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <input value={username} type="text" className="form-control" placeholder="Username" onChange={handleChange('username')} />
        </div>
        <div className="form-group my-3">
          <input value={name} type="text" className="form-control" placeholder="Name" onChange={handleChange('name')} />
        </div>
        <div className="form-group my-3">
          <input value={email} type="email" className="form-control" placeholder="Email" onChange={handleChange('email')} />
        </div>
        <div className="form-group my-3">
          <input value={password} type="password" className="form-control" placeholder="Password" onChange={handleChange('password')} />
        </div>
        <div>
          <button className="btn btn-primary">Sign Up</button>
        </div>
        <p className='m-4'>Already have an account? <Link to="/login">Log in</Link></p>
      </form>

  )

  return(
    <>
      {showError()}
      {showLoading()}
      {showForm && SignupForm()}
    </>
  ) 
}
export default SignUpForm
