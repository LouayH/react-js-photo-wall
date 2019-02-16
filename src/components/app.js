import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sidebar from './sidebar'
import Wall from './wall'
import Login from './login'
import AddPhoto from './add-photo'
import EditPhoto from './edit-photo'
import Photo from './photo'
import db from '../db.json'


const AuthContext = React.createContext();

export class App extends React.Component {
  state = {
    db,
    loggedIn: null
  }

  login = (e, credentials) => {
    this.setState({ loggedIn: credentials.username });
  }

  logout = () => {
    this.setState({ loggedIn: '' })
  }

  getPhoto = (id) => {
    return this.state.db.photos.find(photo => { return photo.id === id})
  }

  addPhoto = (e, _photo) => {
    const max = this.state.db.photos.length > 0 ? Math.max.apply(Math, this.state.db.photos.map(function(i) { return i.id; })) : 0
    const photo = {
      photoUrl: _photo.photoUrl,
      description: _photo.description,
      author: this.state.loggedIn,
      comment: [],
      like:[],
      id: max + 1
    }

    this.setState({ db: { photos: [...this.state.db.photos, photo] } })
  }

  editPhoto = (e, _photo) => {
    const photos = this.state.db.photos
    const photo = _photo
    const index = photos.findIndex(_photo => { return _photo.id === photo.id })
    photos[index] = photo

    this.setState({ db: { photos: photos } })
  }

  deletePhoto = (e, i) => {
    const photos = this.state.db.photos
    photos.splice(i, 1)
    this.setState({ db: { photos } })
  }

  toggleLike = (e, i) => {
    if(this.state.loggedIn) {
      const photos = this.state.db.photos
      const likeIndex = photos[i].like.indexOf(this.state.loggedIn)
      if(likeIndex === -1) {
        photos[i].like.push(this.state.loggedIn)
      } else {
        photos[i].like.splice(likeIndex, 1)
      }
  
      this.setState({ db: { photos } })
    }
  }

  render() {
    return (
      <AuthContext.Provider value={{loggedIn: this.state.loggedIn}}>
        <BrowserRouter>
          <React.Fragment>
            <Sidebar logout={this.logout} />
            <Switch>
              <Route exact path="/" render={props => <Wall {...props} photos={this.state.db.photos} toggleLike={this.toggleLike} deletePhoto={this.toggleLike} />} />
              <Route path="/login" render={props => <Login {...props} login={this.login} />} />
              <Route path="/add-photo" render={props => <AddPhoto {...props} addPhoto={this.addPhoto} />} />
              <Route path="/edit-photo/:id" render={props => <EditPhoto {...props} getPhoto={this.getPhoto} editPhoto={this.editPhoto} />} />
              <Route path="/photo/:id" render={props => <Photo {...props} getPhoto={this.getPhoto} />} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}



export const AuthConsumer = AuthContext.Consumer