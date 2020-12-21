import React from 'react';
import axios from 'axios';
import './Home.scss';
import { InitializeAVD, orderComments } from '../../js/loadSampleData';
import MainVideo from '../MainVideo/MainVideo';
import VideoDesc from '../VideoDesc/VideoDesc';
import NewComment from '../NewComment/NewComment';
import CommentList from '../CommentList/CommentList';
import SideVideoList from '../SideVideoList/SideVideoList';

class Home extends React.Component {
    _isMounted = false;

    state = {
        videos: [],
        activeVideo: { id: '', title: '', channel: '', image: '' },
        activeVideoDetail: InitializeAVD(),
        refreshWithID: false
    };

    componentDidMount() {
        this._isMounted = true;
        const rprops = this.props;

        if (rprops.match.params.id) {
            this.setState({ refreshWithID: true });
        }

        axios.get(window.$BF_URL + window.$BF_VIDEOS + window.$BF_API_KEY)
            .then(result => {
                let firstVideo = {}
                let sideVideos = []
                let arrIndex = -1

                if (this.state.refreshWithID) {
                    arrIndex = result.data.findIndex(video =>
                        video.id === rprops.match.params.id)
                }

                if (!this.state.refreshWithID || (this.state.refreshWithID && arrIndex === -1)) {
                    firstVideo = result.data[0]
                    sideVideos = result.data.splice(1, result.data.length - 1)
                } else if (arrIndex !== -1) {
                    firstVideo = result.data[arrIndex]
                    sideVideos = result.data.filter(video => video.id !== rprops.match.params.id)
                }

                this.setState({ videos: sideVideos })
                axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${firstVideo.id}${window.$BF_API_KEY}`)
                    .then(result => {
                        this.setState({ activeVideoDetail: orderComments(result.data) })
                        this.setState({ activeVideo: firstVideo })
                        this.setState({ refreshWithID: false })
                    })
                    .catch(err => console.log('Error=>', err.response))
            })
            .catch(err => console.log('Error=>', err.response));
    };

    componentDidUpdate() {
        if (this.state.refreshWithID) return;

        const rprops = this.props;
        let video = {};

        if (rprops.match.params.id) {
            video = this.state.videos.find(({ id }) =>
                id === rprops.match.params.id);
        }

        if (!video) return;

        if (Object.keys(video).length !== 0 &&
            this.state.activeVideoDetail.id !== rprops.match.params.id) {
            let arrIndex = this.state.videos.findIndex(video =>
                video.id === rprops.match.params.id);
            let newActiveVideo = this.state.videos[arrIndex];
            let newVideos =
                this.state.videos.filter(video => video.id !== rprops.match.params.id);
            newVideos.push(this.state.activeVideo);
            axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${video.id}${window.$BF_API_KEY}`)
                .then(result => {
                    this.setState({ activeVideoDetail: orderComments(result.data) })
                    this.setState({ activeVideo: newActiveVideo })
                    this.setState({ videos: newVideos })
                })
                .catch(err => console.log('Error=>', err.response))
        }
    };

    updateNewComment = () => {
        axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${this.state.activeVideo.id}${window.$BF_API_KEY}`)
            .then(result => {
                this.setState({ activeVideoDetail: orderComments(result.data) })
            })
            .catch(err => console.log('Error=>', err.response))
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
                        <NewComment videoID={this.state.activeVideo.id} updateComment={this.updateNewComment} />
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