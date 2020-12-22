import React, { Component } from 'react';
import axios from 'axios';
import './NewComment.scss';

export class NewComment extends Component {
    // _isMounted flag used to avoid getting the warning
    // of attempting to call setState() after a component
    // has unmounted
    _isMounted = false;

    // Defining state variables
    state = {
        comment: '',
        commentBtnEnabled: false
    };

    // Lifecycle method allowing code to execute after component is 
    // already placed in the DOM, after the component is rendered 
    componentDidMount() {
        this._isMounted = true;
    };

    // Lifecycle method called when state changes - using to
    // get check the status of the comment state to determine if
    // it is populated or not to ensure the COMMENT button is 
    // enabled or disabled
    componentDidUpdate() {
        if (this.state.comment !== '' && !this.state.commentBtnEnabled) {
            this.setState({ commentBtnEnabled: true });
        } else if (this.state.comment === '' && this.state.commentBtnEnabled) {
            this.setState({ commentBtnEnabled: false });
        }
    };

    // onChange event - comment
    updateComment = event => {
        this.setState({
            comment: event.target.value
        }, this.checkCommentBtnEnabled());
    };

    // Check if the COMMENT button should be enabled
    checkCommentBtnEnabled = () => {
        let isEnabled = false;

        if (this.state.comment !== '') {
            isEnabled = true
        }
        this.setState({
            commentBtnEnabled: isEnabled
        });
    };

    // onClick event for the COMMENT button
    commentBtnClick = () => {
        if (this.state.comment.replace(/\s/g, '') === '') {
            alert('Please enter a comment!');
            this.setState({
                commentBtnEnabled: false
            });
            return;
        };
        // Save the new comment
        let newComment = {
            name: 'Jim Beaumont',
            comment: this.state.comment
        };
        // Perform an axios POST of the new comment
        axios.post(`${window.$BF_URL}${window.$BF_VIDEOS}${this.props.videoID}/${window.$BF_COMMENTS}${window.$BF_API_KEY}`, {
            name: newComment.name,
            comment: newComment.comment
        })
            .then(result => {
                this.props.updateComment()
                this.setState({ comment: '' })
                this.setState({ commentBtnEnabled: false })
            })
            .catch(err => console.log('Error=>', err.response));
    };

    // Lifecycle method called when the component will unmount
    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        let commentImage = './assets/images/Mohan-muruge-sq.jpg';

        return (
            // New Comment Section
            <section className="newcomment">
                <h2 className="newcomment__title">3 Comments</h2>
                <form className="newcomment__form" id="newcomment__form" action="">
                    <div className="newcomment__form-image">
                        <img className="newcomment__image" src={commentImage} alt="new comment pic" />
                    </div>
                    <div className="newcomment__form-main">
                        <div className="newcomment__form-main-left">
                            <label className="newcomment__form-label-comment" htmlFor="commentText">JOIN THE CONVERSATION</label>
                            <textarea
                                className="newcomment__form-textarea"
                                onChange={this.updateComment} value={this.state.comment}
                                rows="5" cols="35"
                                name="commentText" id="commentText"
                                placeholder="Write comment here"></textarea>
                        </div>
                        <div className="newcomment__form-main-right">
                            <button type="button" onClick={this.commentBtnClick} disabled={!this.state.commentBtnEnabled}
                                className="newcomment__form-button" id="newcomment__form-button">COMMENT</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    };
};

export default NewComment