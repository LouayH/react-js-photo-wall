import React from 'react'
import Masonry from 'react-masonry-component'
import Photo from './wall-item'

const masonryOptions = {
  itemSelector: '.photo',
  columnWidth: '.photo',
  transitionDuration: 0
}

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Wall extends React.Component {
  render() {
    return (
      <Masonry className='wall' elementType='ul' options={masonryOptions} imagesLoadedOptions={imagesLoadedOptions}>
        { this.props.photos.map((photo, i) => <Photo key={photo.id} index={i} photo={photo} toggleLike={this.props.toggleLike} deletePhoto={this.props.deletePhoto} />) }
      </Masonry>
    )
  }
}

export default Wall