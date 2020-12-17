import React from 'react';
import './Comment.scss';

export default function Comment({ id, name, ts, text }) {
    return (
        // Comment List/History Detail Div
        <>
            <hr className="comment__divider"></hr>
            <div className="comment" id={id}>
                <div className="comment__image">
                    <img className="comment-image" alt="" />
                </div>
                <div className="comment__detail">
                    <div className="comment__header">
                        <p className="comment__header-name">{name}</p>
                        <p className="comment__header-ts">{ts}</p>
                    </div>
                    <div className="comment__comments" id={id}>
                        <p className="comment__comments-text">{text}</p>
                    </div>
                </div>
            </div>
        </>
    )
};