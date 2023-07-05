import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    openMenu: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickCross = () => {
    this.setState({openMenu: false})
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      openMenu: !prevState.openMenu,
    }))
  }

  render() {
    const {openMenu} = this.state
    return (
      <div>
        <div className="header-container">
          <div className="header-website-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684673482/ccbp/Group_7731_j9ityd.png"
                className="header-website-logo"
                alt="website logo"
              />
            </Link>
          </div>
          <ul className="tabs-container">
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/shelf" className="link">
              <li>Bookshelves</li>
            </Link>
            <li className="list-item">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-navbar-responsive-container">
          <div className="header-navbar-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684673482/ccbp/Group_7731_j9ityd.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
            {openMenu ? (
              <div className="btn-cross">
                <button
                  type="button"
                  className="cross-icon-btn"
                  onClick={this.onClickCross}
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="cross-icon-btn"
                onClick={this.onClickMenu}
              >
                <FiMenu className="menu-icon" />
              </button>
            )}
          </div>
          {openMenu && (
            <>
              <div className="header-navbar-tabs-container">
                <ul>
                  <Link to="/" className="link">
                    <li>Home</li>
                  </Link>
                  <Link to="/" className="link">
                    <li>Bookshelves</li>
                  </Link>
                  <Link to="/login" className="link">
                    <li>
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.onClickLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </Link>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
