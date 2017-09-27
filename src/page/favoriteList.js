import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Favorite from '../components/favorite/favorite';
import logo from '../logo.png';
import '../App.css';

class FavoriteList extends Component {

  render() {
    let list = this.props.testStore.favorite.movieList;

    if (typeof list != 'undefined' && list.length > 0 ) {
      return (
        <div className="App">
          <div className="App-header">
            <Link to='/'>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Favorite store={this.props.store}/>
          </div>
          <div className='video-wrap'>
            {
              list.map(function(item, index) {
                let img = '';
                if (typeof item.poster_path !== 'undefined') {
                  img = item.poster_path;
                } else {
                  img = item.backdrop_path;
                }
                return (
                  <div className='video j-video'
                   key={index}
                   data-id={item.id}>
                   <div className='main-link'>
                     <Link to={`/movie/${item.id}`}>
                       <img width='185' height='278' src={`https://image.tmdb.org/t/p/w500/${img}`}/>
                     </Link>
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
        </div>
      )
    } else {
        return (
          <div className="App">
            <div className="App-header">
              <Link to='/'>
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
              <Favorite store={this.props.store}/>
            </div>
            <p>У вас нет избранных видео</p>
          </div>
        )
    }
  }
}

const mapStateToProps = state => ({
  testStore: state
});

export default connect(
  mapStateToProps,
)(FavoriteList);
