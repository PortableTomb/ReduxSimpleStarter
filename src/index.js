import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import VideoDetail from './components/video_detail'
import VideoList from './components/video_list'
import SearchBar from './components/search_bar'

import YTSearch from 'youtube-api-search';
const API_KEY ='AIzaSyAlhtUFB2JUUmdeqwE-xBnvKX4uZH9_WaE';


// Create new component.
class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('david bowie');
  }

  videoSearch(term) {
    YTSearch( {key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });

  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}


// Render component to the DOM.
ReactDOM.render(<App />, document.querySelector('.container'));
