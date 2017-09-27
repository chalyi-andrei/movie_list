import React, { Component } from 'react';
import { connect } from 'react-redux';
import FIND__MOVIE from '../../actions/search';
import '../../App.css';

class SearchItem extends Component {
  search(e) {
    e.preventDefault();
    
    const searchInput = this.SearchInput;
    const isEmpty = searchInput.value == '';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=ru&query=${this.SearchInput.value}&page=1&include_adult=false`;

    if (!isEmpty) {
      fetch(url)
          .then(response => response.text())
          .then(contents => {
            const object = JSON.parse(contents);
            const props = this.props;
            const videoArray = [];

            object.results.forEach(function(item, index) {
             videoArray.push(item);
            });

            props.onFindMovie(videoArray);
            searchInput.value = '';
          });
    }
  }

  render() {
    return (
        <form onSubmit={(e) => this.search(e)}>
          <input type='text' className='search-input' ref={(input) => { this.SearchInput = input }}/>
          <button className='search-btn'>search</button>
        </form>
    )
  }
}

export default connect(
  state => ({
    testStore: state,
  }),
  dispatch => ({
    onFindMovie: (video) => {
      dispatch({'type': FIND__MOVIE, payload: video});
    }
  })
)(SearchItem);
