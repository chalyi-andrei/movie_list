import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SHOW_RECOMENDATIONS_MOVIES } from '../../actions/movie';
import logo from '../../logo.png';
import '../../App.css';

class Movie extends Component {
  componentDidMount() {
    const pathName = this.props.testStore.router.location.pathname;
    const movieID = pathName.replace(/^.+\//,'');
    const setRecomendationssMovies = this.props.setRecomendationssMovies;
    const url = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=ru&page=1`;

    fetch(url)
        .then(response => response.text())
        .then(contents => {
          const object = JSON.parse(contents);
          let movies = [];

          object.results.forEach(function(item, index) {
              movies.push(item);
          });
          setRecomendationssMovies(movies);
        });
  }

  render() {
    const pathName = this.props.testStore.router.location.pathname;
    const movieID = Number(pathName.replace(/^.+\//,''));
    const items = this.props.testStore.search.movieList;

    let item = items.filter(function(item) {
      if (item.id === movieID){
        return item;
      }
    });
    item = item[0];

    let recomendationItems = this.props.testStore.favorite.recomendationsList;
    recomendationItems = recomendationItems.slice(0, 3);

    return (
      <div className="App">
      <div className="App-header">
      <Link to='/'>
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      </div>
      <div className='video-info'>
        <div className='video-wrap'>
          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} width='300' height='450'/>
          <div className='info info-small'>
            <h3 className='info-title'>
              {item.title}
             <span className='title-date'>({item.release_date.slice(0,4)})</span>
            </h3>
            <div>
              <div>Рейтинг {item.vote_average}</div>
            </div>
            <p className='info-paragraph'>{item.overview}</p>
          </div>
        </div>
      </div>
      <div>
      <div className='recomendation-block'>
        <h4 className='recomendation-title'>Вам понравится</h4>
        {
          recomendationItems.map(function(item, i) {
            return(
              <div className='recomendation-item' key={i}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}  height='120'/>
                <h5 className='recomendation-title-small'>
                {item.title}
                <span>Рейтинг {item.vote_average}</span>
                </h5>
              </div>
            )
          })
        }
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  testStore: state
});

const mapDispatchToProps = dispatch => ({
  setRecomendationssMovies: (movies) => {
    dispatch({'type': SHOW_RECOMENDATIONS_MOVIES, payload: movies});
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie)
