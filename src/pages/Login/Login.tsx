import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'


// import styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './login.css'


const Login = () => {

  // refrence to email input
  const emailRef = useRef<HTMLInputElement>(null)

  // local states
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string | string[] | null>('')

  // links and routing 
  const navigate = useNavigate()
  const location = useLocation()

  // use reducers (redux toolkit query)

  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()


  // first render behavior 
  useEffect(() => { if (emailRef.current) emailRef.current.focus() }, [])
  useEffect(() => { setErrMsg([]) }, [email, password])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // don't refresh the page
    e.preventDefault()

    // remove last error message 
    setErrMsg([]);

    try {

      // login request
      const userData = await login({ email, password }).unwrap()

      // save state
      dispatch(setCredentials({ ...userData.user, token: userData.token }))

      // clear input and move on
      setEmail('')
      setPassword('')
      navigate('/home')

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

  // check if the user is authenticated -> he don't have to be in the login page 
  const token = useSelector(selectCurrentToken)
  if (token)
    return <Navigate to="/home" state={{ from: location }} replace />

  // ui elements 
  return (
    <>
      <div className="login-container">
        <h2 className="login-h2">Login Page</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          {/* email */}
          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='off'
                className='login-input '
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
                className='login-input '
              />
            </div>
          </div>
          {/* login button */}
          <button type="submit" className='login-button'>{isLoading ? 'LOGGING IN...' : 'LOGIN'}</button>
        </form>
        {/* display errors area */}
        {errMsg && <div className="error-message">{errMsg}</div>}
        {/* link to register page */}
        <div className="create-account-card" style={{ display: isLoading ? 'none' : '' }}>
          <h3>Don't have an account?</h3>
          <Link to='/register' className='create-account-link'><p>Create one now !</p></Link>
        </div>
      </div>
    </>
  )
}
export default Login