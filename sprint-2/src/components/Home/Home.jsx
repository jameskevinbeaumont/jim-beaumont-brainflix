import React from 'react';
import axios from 'axios';
import './Home.scss';
import { InitializeMVO } from '../../js/loadSampleData';
import MainVideo from '../MainVideo/MainVideo';
import VideoDesc from '../VideoDesc/VideoDesc';
import NewComment from '../NewComment/NewComment';
import CommentList from '../CommentList/CommentList';
import SideVideoList from '../SideVideoList/SideVideoList';

class Home extends React.Component {
    _isMounted = false;

    state = {
        videos: [],
        mainvideo: InitializeMVO()
    };

    componentDidMount() {
        this._isMounted = true;
        console.log('componentDidMount - Home.jsx');

        axios.get(window.$BF_URL + window.$BF_VIDEOS + window.$BF_API_KEY)
            .then(result => {
                let firstVideo = result.data[0]
                let sideVideos = result.data.splice(1, result.data.length - 1)
                this.setState({ videos: sideVideos })
                axios.get(window.$BF_URL + window.$BF_VIDEOS + firstVideo.id + window.$BF_API_KEY)
                    .then(result => {
                        this.setState({ mainvideo: result.data })
                    })
                    .catch(err => console.log('Error=>', err.response))
            })
            .catch(err => console.log('Error=>', err.response));
    };

    componentDidUpdate() {
        console.log('componentDidUpdate - Home.jsx');

        const rprops = this.props;

        console.log(rprops);
        console.log(this.state.videos);
        if (Object.keys(rprops.match.params).length !== 0) {
            console.log(console.log('match.params: ', rprops.match.params))
        };

        const video = this.state.videos.find(({ id }) => id === rprops.match.params.id);

        if (video) {
            console.log(video);
            console.log(video.id);
            axios.get(window.$BF_URL + window.$BF_VIDEOS + video.id + window.$BF_API_KEY)
                .then(result => {
                    this.setState({ mainvideo: result.data })
                })
                .catch(err => console.log('Error=>', err.response))
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {

        return (
            <div>
                {/* {console.log('Home.jsx render (MainVideo) -> this.state.mainvideo', this.state.mainvideo)} */}
                <MainVideo videoObj={this.state.mainvideo} />
                <main className="main">
                    <div className="main__left">
                        <VideoDesc videoObj={this.state.mainvideo} />
                        <NewComment />
                        {/* {console.log('Home.jsx render (CommentList) -> this.state.mainvideo.comments', this.state.mainvideo.comments)} */}
                        <CommentList videoComments={this.state.mainvideo.comments} />
                    </div>
                    <div className="main__right">
                        <SideVideoList videoList={this.state.videos} />
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;