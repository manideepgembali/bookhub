import './index.css'

const FailureView = props => {
  const {onClickRetry} = props
  const onClickButton = () => {
    onClickRetry()
  }
  return (
    <>
      <div className="top-rated-failure-container">
        <img
          src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684860584/ccbp/Group_7522_sparu4.png"
          alt="failure view"
          className="failure-image"
        />
        <p>Something went wrong. Please try again</p>
        <button
          type="button"
          className="top-rated-failure-btn"
          onClickButton={onClickButton}
        >
          Try Again
        </button>
      </div>
    </>
  )
}
export default FailureView
