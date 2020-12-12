import React from 'react';
import './NewComment.scss';

export default function Comments () {
    const commentImage = './assets/images/Mohan-muruge-sq.jpg';

    return (
    <section className="newcomment">
        <h2 className="newcomment__title">3 Comments</h2>
        <form className="newcomment__form" id="newcomment__form" action="">
            <div className="newcomment__form-image">
                <img className="newcomment-image" src={commentImage} alt="new comment pic" />
            </div>
            <div className="newcomment__form-main">
                <div className="newcomment__form-main--left">
                    <label className="newcomment__form-label--comment" htmlFor="commentText">JOIN THE CONVERSATION</label>
                    <textarea 
                        className="newcomment__form-textarea" 
                        rows="5" cols="35" 
                        name="commentText" id="commentText" required
                        placeholder="Write comment here"></textarea> 
                </div>
                <div className="newcomment__form-main--right">
                    <button className="newcomment__form-button" id="newcomment__form-button" type="submit">COMMENT</button>
                </div>
            </div>
        </form>
    </section>
    );
}