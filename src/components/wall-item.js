import React from 'react'
import { AuthConsumer } from './app'
import { Link } from 'react-router-dom'

class Photo extends React.Component {
  render() {
    return (
      <AuthConsumer>
      { context => 
        <li className="photo">
          <Link to={`/photo/${this.props.photo.id}`}>
            <img src={this.props.photo.photoUrl} alt="" />
          </Link>
          <div className="counters">
            <span className="comment">
              <i className="material-icons">
                comment
              </i>
              { this.props.photo.comment.length }
            </span>
            <span className="favorite">
              <i className={`material-icons ${this.props.photo.like.includes(context.loggedIn) ? 'active' : undefined}`} onClick={(e) => this.props.toggleLike(e, this.props.index)}>
                favorite
              </i>
              { this.props.photo.like.length }
            </span>
          </div>
          { this.props.photo.author === context.loggedIn &&
            <div className="actions">
              <span className="edit">
                <Link to={`/edit-photo/${this.props.photo.id}`}>
                  <i className="material-icons">
                    edit
                  </i>
                </Link>
              </span>
              <span className="delete">
                <i className="material-icons" onClick={(e) => this.props.deletePhoto(e, this.props.index)}>
                  delete
                </i>
              </span>
            </div> }
        </li> } 
      </AuthConsumer>
    );
  }
}

export default Photo