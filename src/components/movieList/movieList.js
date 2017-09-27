import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_POPULAR_MOVIES_START, GET_POPULAR_MOVIES_SUCCESS, ADD_FAVORITE_MOVIES } from '../../actions/movie';
import '../../App.css';
import like from '../../icon-like.png';
import loader from '../../loader.gif';

class MovieList extends Component {

  componentDidMount() {
    const setPopularMovies = this.props.setPopularMovies;
    const startFetchMovies = this.props.startFetchMovies;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=ru-US&page=1`;

    if (this.props.testStore.search.movieList.length === 0) {
      startFetchMovies('start');
      fetch(url)
          .then(response => response.text())
          .then(contents => {
            const object = JSON.parse(contents);
            let movies = [];

            object.results.forEach(function(item, index) {
                movies.push(item);
            });
            setTimeout(function() {
              setPopularMovies(movies)
            }, 500);

          });
    }
  }

  addFavorite(e) {
    const list = this.props.testStore.search.movieList;
    const el = e.target.closest('.j-video');
    const id = el.getAttribute('data-id');
    const props = this.props;

    list.forEach(function(item) {
      if (item.id == id) {
        props.addFavoriteMovies(item);
      }
    });
  }

  render() {
    const self = this;
    let list = this.props.testStore.search.movieList;

    if (typeof list != 'undefined' && list.length > 0 ) {
      return (
          <div className='video-wrap'>
            {
              list.map(function(item, index) {
                return (
                  <div className='video j-video'
                   key={index}
                   data-id={item.id}>
                   <div className='main-link'>
                     <Link to={`/movie/${item.id}`}>
                       <img width='185' height='278'
                       src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}/>
                     </Link>
                     <div className='sidebar'>
                       <img width='27'
                         src={like}
                         className='like-img'
                         onClick={(e) => self.addFavorite(e)}/>
                     </div>
                   </div>
                    <div className='info'>
                    <p className='paragraph'>
                    <span className='movie-name'>{item.title}</span>
                      {item.overview}
                    </p>
                    <Link to={`/movie/${item.id}`} className='show-more'>Подробнее</Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
      )
    } else {
      const isFetching = this.props.testStore.search.fetching;

      if (isFetching == true) {
        return (
          <img src={loader}/>
        )
      } else {
        return (
          <p>Нет фильмов, удовлетворяющих условиям поиска.</p>
        )
      }
    }
  }
}

const mapStateToProps = state => ({
  testStore: state
});

const mapDispatchToProps = dispatch => ({
  startFetchMovies: (text) => {
    dispatch({'type': GET_POPULAR_MOVIES_START, payload: text});
  },
  setPopularMovies: (movies) => {
    dispatch({'type': GET_POPULAR_MOVIES_SUCCESS, payload: movies});
  },
  addFavoriteMovies: (movies) => {
    dispatch({'type': ADD_FAVORITE_MOVIES, payload: movies});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
