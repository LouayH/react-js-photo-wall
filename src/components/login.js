import React from 'react'
import { AuthConsumer } from './app'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  setCredentials = (e) => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.login(e, this.state)
  }

  render() {
    return (
      <AuthConsumer>
      { context => 
        context.loggedIn ?
        <Redirect to="/" /> :
        <section id="login">
          <h1>
            Login Page
          </h1>
          <form onSubmit={this.submit}>
            <div className="input-group">
              <label htmlFor="username">
                Username:
              </label>
              <input type="text" id="username" name="username" value={this.state.username} onChange={this.setCredentials} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">
                Password:
              </label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={this.setCredentials} required />
            </div>
            <div className="input-group">
              <button type="submit">
                Login
              </button>
            </div>
          </form>
        </section> }
      </AuthConsumer>
    )
  }
}

export default Login