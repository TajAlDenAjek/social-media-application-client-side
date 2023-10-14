import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'


// import styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './register.css'


const Register = () => {

  // refrence to username input
  const usernameRef = useRef<HTMLInputElement>(null)

  // local states
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string | string[] | null>('')

  // links and routing 
  const navigate = useNavigate()
  const location = useLocation()

  // use reducers (redux toolkit query)

  const dispatch = useDispatch()
  const [register, { isLoading }] = useRegisterMutation()


  // first render behavior 
  useEffect(() => { if (usernameRef.current) usernameRef.current.focus() }, [])
  useEffect(() => { setErrMsg([]) }, [email, password])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // don't refresh the page
    e.preventDefault()

    // remove last error message 
    setErrMsg([]);

    try {

      // register request
      const userData = await register({ username, email, password }).unwrap()

      // save state
      dispatch(setCredentials({ ...userData.user, token: userData.token }))

      // clear input and move on
      setUsername('');
      setEmail('')
      setPassword('')
      navigate('/login')

    } catch (error: any) {
      // handleing error message from backend api
      //init 
      setErrMsg([]);
      let oneError: Boolean = false;
      const errors = error.data;
      let errorText: string[] = [];

      // loop over errors
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          errorText.push(errors[key])
          oneError = true
        }
      }
      // setting new error message
      setErrMsg(errorText)
      // default message 
      if (!oneError)
        setErrMsg('Something Went Wrong !!')
    }
  }

  // check if the user is authenticated -> he don't have to be in the register page 
  const token = useSelector(selectCurrentToken)
  if (token)
    return <Navigate to="/home" state={{ from: location }} replace />

  // ui elements 
  return (
    <>
      <div className="register-container">
        <h2 className='register-h2'>Register Page</h2>
        <form onSubmit={handleSubmit} className='register-form'>
          {/* username */}
          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="username"
                id="username"
                ref={usernameRef}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete='off'
                className='register-input'
              />
            </div>
          </div>
          {/* email */}
          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='off'
                className='register-input'
              />
            </div>
          </div>
          {/* password */}
          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='off'
                className='register-input'
              />
            </div>
          </div>
          {/* register button */}
          <button type="submit" className='register-button'>{isLoading ? 'REGISTERING...' : 'REGISTER'}</button>
        </form>
        {/* display errors area */}
        {errMsg && <div className="error-message">{errMsg}</div>}
        {/* link to register page */}
        <div className="have-account-card" style={{ display: isLoading ? 'none' : '' }}>
          <h3>Already have an account?</h3>
          <Link to='/login' className='have-account-link'><p>Login in now !</p></Link>
        </div>
      </div>
    </>
  )
}
export default Register