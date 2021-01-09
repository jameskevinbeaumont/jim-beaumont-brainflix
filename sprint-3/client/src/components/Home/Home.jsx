import React from 'react';
import axios from 'axios';
import './Home.scss';
import { InitializeAVD, orderComments } from '../../js/util';
import MainVideo from '../MainVideo/MainVideo';
import VideoDesc from '../VideoDesc/VideoDesc';
import NewComment from '../NewComment/NewComment';
import CommentList from '../CommentList/CommentList';
import SideVideoList from '../SideVideoList/SideVideoList';

class Home extends React.Component {
    // _isMounted flag used to avoid getting the warning
    // of attempting to call setState() after a component
    // has unmounted
    _isMounted = false;

    // Defining state variables
    state = {
        videos: [],
        activeVideo: { id: '', title: '', channel: '', image: '' },
        activeVideoDetail: InitializeAVD(),
        commentCount: 0,
        refreshWithID: false
    };

    // Lifecycle method allowing code to execute after component is 
    // already placed in the DOM, after the component is rendered 
    componentDidMount() {
        // console.log('Home - componentDidMount');
        this._isMounted = true;
        const rprops = this.props;

        if (rprops.match.params.id) {
            this.setState({ refreshWithID: true });
        }
        // Axios GET to obtain the video list based on no ID passed
        // (default) or based on specific video ID passed
        axios.get(window.$BF_URL + window.$BF_VIDEOS)
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
                // console.log('Home - state -> videos being set');
                this.setState({ videos: sideVideos })
                // Axios GET to obtain detailed video data based on
                // the video displayed in the main player
                axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${firstVideo.id}`)
                    .then(result => {
                        this.setState({ activeVideoDetail: orderComments(result.data) })
                        this.setState({ commentCount: result.data.comments.length })
                        this.setState({ activeVideo: firstVideo })
                        this.setState({ refreshWithID: false })
                    })
                    .catch(err => console.log('Error=>', err.response))
            })
            .catch(err => console.log('Error=>', err.response));
    };

    // Lifecycle method called when state changes - using to
    // get new video detail for the main video player if the user
    // selects a video from the side video list
    componentDidUpdate() {
        // console.log('Home - componentDidUpdate');
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
            axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${video.id}`)
                .then(result => {
                    this.setState({ activeVideoDetail: orderComments(result.data) })
                    this.setState({ commentCount: result.data.comments.length })
                    this.setState({ activeVideo: newActiveVideo })
                    this.setState({ videos: newVideos })
                })
                .catch(err => console.log('Error=>', err.response))
        }
    };
    // Function passed to NewComment component used to indicate
    // if a new comment has been added - if so, we need to get the
    // updated video detail and re-order the comments from newest
    // to oldest
    updateNewComment = () => {
        // console.log('Home - updateNewComment');
        axios.get(`${window.$BF_URL}${window.$BF_VIDEOS}${this.state.activeVideo.id}`)
            .then(result => {
                this.setState({ activeVideoDetail: orderComments(result.data) })
                this.setState({ commentCount: result.data.comments.length })
            })
            .catch(err => console.log('Error=>', err.response))
    };

    // Lifecycle method called when the component will unmount
    componentWillUnmount() {
        // console.log('Home - componentWillUnmount');
        this._isMounted = false;
    };

    render() {
        // Build the main video page
        return (
            <div>
                <MainVideo videoObj={this.state.activeVideoDetail} />
                <main className="main">
                    <div className="main__left">
                        <VideoDesc videoObj={this.state.activeVideoDetail} />
                        <NewComment videoID={this.state.activeVideo.id} commentCount={this.state.commentCount} updateComment={this.updateNewComment} />
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