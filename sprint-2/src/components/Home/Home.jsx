import React from 'react';
import axios from 'axios';
import './Home.scss';
import { InitializeAVD } from '../../js/loadSampleData';
import MainVideo from '../MainVideo/MainVideo';
import VideoDesc from '../VideoDesc/VideoDesc';
import NewComment from '../NewComment/NewComment';
import CommentList from '../CommentList/CommentList';
import SideVideoList from '../SideVideoList/SideVideoList';

class Home extends React.Component {
    _isMounted = false;

    state = {
        videos: [],
        activeVideo: [{ id: '', title: '', channel: '', image: '' }],
        activeVideoDetail: InitializeAVD()
    };

    componentDidMount() {
        this._isMounted = true;

        axios.get(window.$BF_URL + window.$BF_VIDEOS + window.$BF_API_KEY)
            .then(result => {
                let firstVideo = result.data[0]
                let sideVideos = result.data.splice(1, result.data.length - 1)
                this.setState({ videos: sideVideos })
                axios.get(window.$BF_URL + window.$BF_VIDEOS + firstVideo.id + window.$BF_API_KEY)
                    .then(result => {
                        this.setState({ activeVideoDetail: result.data })
                        this.setState({ activeVideo: firstVideo })
                    })
                    .catch(err => console.log('Error=>', err.response))
            })
            .catch(err => console.log('Error=>', err.response));
    };

    componentDidUpdate() {
        const rprops = this.props;
        const video = this.state.videos.find(({ id }) =>
            id === rprops.match.params.id);

        if (video && this.state.activeVideoDetail.id !== rprops.match.params.id) {
            let arrIndex = this.state.videos.findIndex(video =>
                video.id === rprops.match.params.id);
            let newActiveVideo = this.state.videos[arrIndex];
            let newVideos =
                this.state.videos.filter(video => video.id !== rprops.match.params.id);
            newVideos.push(this.state.activeVideo);
            axios.get(window.$BF_URL + window.$BF_VIDEOS + video.id + window.$BF_API_KEY)
                .then(result => {
                    this.setState({ activeVideoDetail: result.data })
                    this.setState({ activeVideo: newActiveVideo })
                    this.setState({ videos: newVideos })
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
                <MainVideo videoObj={this.state.activeVideoDetail} />
                <main className="main">
                    <div className="main__left">
                        <VideoDesc videoObj={this.state.activeVideoDetail} />
                        <NewComment />
                        <CommentList videoComments={this.state.activeVideoDetail.comments} />
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