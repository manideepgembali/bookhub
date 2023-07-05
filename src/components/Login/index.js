import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPasswordView = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          Password*
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input-value"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameView = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-label">
          Username*
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="input-value"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login-form-container">
        <img
          src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684675302/ccbp/Rectangle_1467_od8vej.png"
          alt="website login"
          className="website-login-mobile-image"
        />
        <img
          src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684675302/ccbp/Rectangle_1467_od8vej.png"
          alt="website login"
          className="website-login-image"
        />
        <div className="form-main-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dcjkgmi2q/image/upload/v1684673482/ccbp/Group_7731_j9ityd.png"
              alt="login website logo"
              className="login-website-logo"
            />
            <div className="input-container">{this.renderUsernameView()}</div>
            <div className="input-container">{this.renderPasswordView()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
