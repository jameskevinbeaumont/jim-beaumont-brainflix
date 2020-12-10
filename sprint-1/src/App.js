import './App.scss';
import Header from './components/Header/Header';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import VideoDesc from './components/VideoDesc/VideoDesc';
import NewComment from './components/NewComment/NewComment';
import CommentList from './components/CommentList/CommentList';
import SideVideoList from './components/SideVideoList/SideVideoList';

function App() {
  return (
    <div className="App">
      <Header />
      <VideoPlayer />
      <main>
        <VideoDesc />
        <NewComment />
        <CommentList />
        <hr className="comment__divider"></hr>
        <SideVideoList />
      </main>
    </div>
  );
}

export default App;
