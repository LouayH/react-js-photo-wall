import React from 'react'
import { AuthConsumer } from './app'
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {
  render() {
    return (
      <AuthConsumer>
      { context => 
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <i className="material-icons">home</i>
              </Link>
            </li>
            { context.loggedIn ? 
              <>
                <li>
                  <Link to="/add-photo">
                    <i className="material-icons">add</i>
                  </Link>
                </li>
                <li>
                  <i className="material-icons" onClick={this.props.logout}>arrow_back</i>
                </li>
              </>:
              <li>
                <Link to="/login">
                  <i className="material-icons">arrow_forward</i>
                </Link>
              </li> }
          </ul>
        </nav>
      </aside> }
      </AuthConsumer>
    )
  }
}

export default Sidebar