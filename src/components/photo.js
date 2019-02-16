import React from 'react'
import { AuthConsumer } from './app'

class Photo extends React.Component {
  state = this.props.getPhoto(parseInt(this.props.match.params.id))

  render() {
    return (
      <AuthConsumer>
      { consumer => 
        <div id="single_photo">
          <figure>
            <img src={this.state.photoUrl} alt={this.state.description} />
          </figure>
          <div className="info">
            <p>
              <strong>{this.state.author}</strong> { this.state.description }
            </p>
            { (this.state.like.length > 0 && this.state.like.length <= 3) && 
              <small>
                <i className="material-icons">
                  favorite
                </i>
                { this.state.like.map((like, i) => (i === 0) ? like : `, ${like}`) }
              </small>
            }
            { (this.state.like.length > 3) && 
              <small>
                <i className="material-icons">
                  favorite
                </i>
                { `${this.state.like[0]}, ${this.state.like[1]} and ${this.state.like.length - 2} others` }
              </small>
            }
            { this.state.comment.length > 0 && 
              <ul id="comments">
                { this.state.comment.map(comment => <li><strong>{comment.author}</strong> {comment.text}</li> )}
              </ul>
            }
          </div>
        </div>
      }
      </AuthConsumer>
    )
  }
}

export default Photo