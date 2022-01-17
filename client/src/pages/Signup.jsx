import SignUpForm from '../components/SignUpForm'
import { useEffect } from 'react';
import { isAuth } from "../actions/auth";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  useEffect( () => {
    if (isAuth()) {
      navigate(`/`)
    }
  }, [navigate])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className='text-center my-3 text-primary' style={{fontFamily: "Permanent Marker, cursive"}}>SIGN UP</h2>
        <div className="col-11 col-md-8 col-lg-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default Signup
