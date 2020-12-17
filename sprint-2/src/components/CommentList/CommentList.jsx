import React from 'react';
import './CommentList.scss';
import Comment from '../Comment/Comment';
import { generateTimeStamp } from '../../js/loadSampleData';


export default function CommentList({ videoComments }) {
    return (
        // Comment List/History Div
        <div className="comments__history" id="comments-container">
            {videoComments.map((comment) =>
                <Comment key={comment.id}
                    id={comment.id}
                    name={comment.name}
                    ts={generateTimeStamp(comment.timestamp)}
                    text={comment.comment}>
                </Comment>)}
            <hr className="comment__divider"></hr>
        </div>
    );
};