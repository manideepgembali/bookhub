import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import './index.css'

const topRatedStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 2,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topRatedApiStatus: topRatedStatus.initial,
    topBooksList: [],
  }

  componentDidMount = () => {
    this.getBooks()
  }

  onClickRetry = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({topRatedApiStatus: topRatedStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      console.log(updatedData)
      this.setState({
        topRatedApiStatus: topRatedStatus.success,
        topBooksList: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topBooksList} = this.state
    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {topBooksList.map(eachBook => {
            const {coverPic, authorName, id, title} = eachBook
            return (
              <Link to={`/books/${id}`} className="text-links">
                <li key={id} className="slick-item">
                  <img
                    src={coverPic}
                    className="slick-item-cover-pic"
                    alt="title"
                  />
                  <h1 className="title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderSlider = () => {
    const {topRatedApiStatus} = this.state
    switch (topRatedApiStatus) {
      case topRatedStatus.success:
        return this.renderSuccessView()
      case topRatedStatus.failure:
        return this.renderFailureView()
      case topRatedStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="homepage-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-paragraph">
            You are in the right place.Tell us what titles or generes you have
            enjoyed in the past,and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf">
            <button type="button" className="find-books-btn responsive-btn">
              Find Books
            </button>
          </Link>
          <div className="slider-container">
            <div className="slider-top-container">
              <h1 className="home-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button
                  type="button"
                  className="find-books-btn responsive-btn-sm"
                >
                  Find Books
                </button>
              </Link>
            </div>
            <div>{this.renderSlider()}</div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
