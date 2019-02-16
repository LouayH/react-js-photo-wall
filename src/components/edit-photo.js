import React from 'react'
import { AuthConsumer } from './app'
import { Redirect } from 'react-router-dom'
  
class EditPhoto extends React.Component {
  state = this.props.getPhoto(parseInt(this.props.match.params.id))

  setPost = (e) => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.editPhoto(e, this.state)
    this.props.history.push('/')
  }

  render() {
    return (
      <AuthConsumer>
      { context => 
        !context.loggedIn ?
        <Redirect to="/" /> :
        <section id="edit_photo">
          <h1>
            Edit Photo
          </h1>
          <form onSubmit={this.submit}>
            <div className="input-group">
              <label htmlFor="photoUrl">
                Photo URL:
              </label>
              <input type="text" id="photoUrl" name="photoUrl" value={this.state.photoUrl} onChange={this.setPost} required />
            </div>
            <div className="input-group">
              <label htmlFor="description">
                Description:
              </label>
              <input type="text" id="description" name="description" value={this.state.description} onChange={this.setPost} required />
            </div>
            <div className="input-group">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </section> }
      </AuthConsumer>
    )
  }
}

export default EditPhoto