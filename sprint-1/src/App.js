import React from 'react';
import './App.scss';
import {videoData, commentData, mainVideoObject} from './js/loadSampleData';
import Header from './components/Header/Header';
import MainVideo from './components/MainVideo/MainVideo';
import VideoDesc from './components/VideoDesc/VideoDesc';
import NewComment from './components/NewComment/NewComment';
import CommentList from './components/CommentList/CommentList';
import SideVideoList from './components/SideVideoList/SideVideoList';

class App extends React.Component {
  // State initialization
  state = {
    videos: videoData(),
    comments: commentData(),
    mainvidobj: mainVideoObject() 
  };

  // Functions
  loadVideos = () => {
    console.log('test')
    if (this.state.videos && this.state.videos.length > 0) {
      // console.log(this.state.videos);
      return;
    } else {
      const sideVideos = videoData();
      this.setState({videos: sideVideos});
    }
  };

  render() {
    return (
      <div className="body">
        {/* {this.loadVideos()} */}
        <Header />
        <MainVideo mainVideoObj={this.state.mainvidobj}/>
        <main className="main">
          <div className="main-left">
            <VideoDesc mainVideoObj={this.state.mainvidobj}/>
            <NewComment />
            <CommentList videoComments={this.state.mainvidobj.comments}/>
          </div>
          <div className="main-right">
            <SideVideoList videoList={this.state.videos}/>
          </div>
        </main>
      </div>
    )
  }
}

export default App;
