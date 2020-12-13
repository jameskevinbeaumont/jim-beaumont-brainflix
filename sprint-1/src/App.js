import React from 'react';
import './App.scss';
import {GetVideoData, InitializeMVO, GetMainVideoObject} from './js/loadSampleData';
import Header from './components/Header/Header';
import MainVideo from './components/MainVideo/MainVideo';
import VideoDesc from './components/VideoDesc/VideoDesc';
import NewComment from './components/NewComment/NewComment';
import CommentList from './components/CommentList/CommentList';
import SideVideoList from './components/SideVideoList/SideVideoList';

class App extends React.Component {
  // State initialization
  state = {
    videos: [],
    mainvideo: InitializeMVO() 
  };

  componentDidMount() {
    GetVideoData()
    .then(result => {
      let firstVideo = result[0]
      let sideVideos = result.splice(1, result.length - 1)
      this.setState({videos: sideVideos})
      return GetMainVideoObject(firstVideo)
    })
    .then(result => {
     this.setState({mainvideo: result})
    })
    .catch(err => console.log('Error=>', err.response));
  };

  componentWillUnmount() {
  };

  render() {
    return (
      <div>
        <Header />
        <MainVideo mainVideoObj={this.state.mainvideo}/>
        <main className="main">
          <div className="main-left">
            <VideoDesc mainVideoObj={this.state.mainvideo}/>
            <NewComment />
            <CommentList videoComments={this.state.mainvideo.comments}/>
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
