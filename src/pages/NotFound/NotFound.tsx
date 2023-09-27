import { Link } from 'react-router-dom';
import './notfound.css'
const NotFound = () => {
  const goBack = () => {
    <Link to={String(window.history.back())} />
  };
  return (
    <div className="notFoundPage-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <span role="img" aria-label="Emoji">😄😉😮</span>
      <p>But don't worry, you can always go back or try again!</p>
      <button onClick={goBack}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;