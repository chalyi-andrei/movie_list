import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../App.css';

class Favorite extends Component {

  render() {
    const favariteCount = this.props.testStore.favorite.movieList.length;
    return (
      <Link to='/favorite' className='favorite-link'>
        <div>Избранные {favariteCount}</div>
      </Link>
    )
  }
}

const mapStateToProps = state => ({
  testStore: state
});

export default connect(
  mapStateToProps,
)(Favorite);
