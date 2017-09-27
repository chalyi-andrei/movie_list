import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchItem from './components/searchItem/searchItem';
import MovieList from './components/movieList/movieList';
import Favorite from './components/favorite/favorite';
import logo from './logo.png';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Link to='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <SearchItem store={this.props.store}/>
            <Favorite store={this.props.store}/>
        </div>
        <MovieList store={this.props.store}/>
      </div>
    );
  }
}
