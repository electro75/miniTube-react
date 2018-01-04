import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDFc9XVxPgPxbcxLe1HjcPtU4oFrxkyMGM';

class App extends Component {

	constructor(props){
		super(props);

		this.state = { 
            videos: [],
            selectedVideo: null
        }
        
        this.videoSearch('dog');
    }
    
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ videos,                                  //object literal syntax used
            selectedVideo: videos[0]});
		});
    }

	render() {
        
        const videoSearch = _.debounce((term) =>{ this.videoSearch(term) }, 600)
        
		return (
			<div>
				<SearchBar onSearchInit = {videoSearch} />
                <div className="container">        
                    <div className="row">
                        <div className="col-xs-7">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="col-xs-5">
                            <VideoList 
                                onVideoSelect = {selectedVideo =>{this.setState({selectedVideo})}}
                                videos={this.state.videos} />
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector('.container'));
