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
        // console.log('componentDidMount - Home.jsx');

        axios.get(window.$BF_URL + window.$BF_VIDEOS + window.$BF_API_KEY)
            .then(result => {
                let firstVideo = result.data[0]
                // console.log('firstVideo: ', firstVideo)
                let sideVideos = result.data.splice(1, result.data.length - 1)
                // console.log('sideVideoes: ', sideVideos)
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
        // console.log('componentDidUpdate - Home.jsx');

        const rprops = this.props;

        // console.log(rprops);
        // console.log(this.state.videos);
        // console.log('activeVideo: ', this.state.activeVideo);
        // console.log('activeVideoDetail: ', this.state.activeVideoDetail);
        // if (Object.keys(rprops.match.params).length !== 0) {
        //     console.log(console.log('match.params: ', rprops.match.params))
        // };

        const video = this.state.videos.find(({ id }) =>
            id === rprops.match.params.id);

        if (video && this.state.activeVideoDetail.id !== rprops.match.params.id) {
            // console.log('video: ', video);
            // console.log('video.id: ', video.id);
            // let newActiveVideoObj = { id: '', title: '', channel: '', image: '' };
            let arrIndex = this.state.videos.findIndex(video =>
                video.id === rprops.match.params.id);
            // console.log('arrIndex: ', arrIndex);
            let newActiveVideo = this.state.videos[arrIndex];

            //this.state.videos.filter(video => video.id === rprops.match.params.id);
            // newActiveVideoObj.id = newActiveVideo[0].id;
            // newActiveVideoObj.title = newActiveVideo[0].title;
            // newActiveVideoObj.channel = newActiveVideo[0].channel;
            // newActiveVideoObj.image = newActiveVideo[0].image;
            // console.log('newActiveVideoObj: ', newActiveVideoObj);
            // console.log('newActiveVideo: ', newActiveVideo);
            let newVideos =
                this.state.videos.filter(video => video.id !== rprops.match.params.id);
            // console.log('newVideos (before push): ', newVideos);
            // console.log('this.state.activeVideo (before push): ', this.state.activeVideo);
            newVideos.push(this.state.activeVideo);
            // console.log('newVideos (after push): ', newVideos);
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