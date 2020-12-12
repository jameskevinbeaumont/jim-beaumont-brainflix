import React from 'react';
import './CommentList.scss';
import Comment from '../Comment/Comment';

export default function CommentList ({videoComments}) {

    return (
        <div className="comments__history" id="comments-container">
            {videoComments.map((comment, index) => 
            <Comment key={index} 
                     id={index} 
                     name={comment.commentName} 
                     date={comment.commentDate} 
                     ts={comment.commentTS} 
                     text={comment.commentText}>
            </Comment>)}
            <hr className="comment__divider"></hr>
        </div>
    );
};