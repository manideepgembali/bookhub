import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickGoHomeBtn = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684913256/ccbp/Group_7484_bhpjhr.png"
        alt="not found"
        className="not-found-image"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button
          type="button"
          className="not-found-btn"
          onClick={onClickGoHomeBtn}
        >
          Go back to Homepage
        </button>
      </Link>
    </div>
  )
}
export default NotFound
