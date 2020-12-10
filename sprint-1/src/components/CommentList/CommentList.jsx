import React, { Component } from 'react';
import './commentlist.scss';
import Comment from '../Comment/Comment';

class CommentList extends Component {
    state = {
        comments: [
            {
            commentID: 1,
            commentName: 'Michael Lyons',
            commentDate: '11/17/2020 08:14:27',
            commentTS: '3 weeks ago',
            commentText: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
            },
            {
            commentID: 2,
            commentName: 'Gary Wong',
            commentDate: '05/12/2020 23:24:00',
            commentTS: '7 months ago',
            commentText: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
            },
            {
            commentID: 3,
            commentName: 'Theodore Duncan',
            commentDate: '08/15/2018 15:48:57',
            commentTS: '2 years ago',
            commentText: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!'
            }        
        ]
    };

    render() {
        return (
            <div className="comments__history" id="comments-container">
                {this.state.comments.map((comment, index) => <Comment key={index} id={index} name={comment.commentName} date={comment.commentDate} ts={comment.commentTS} text={comment.commentText}></Comment>)}
            </div>
        );
    };
};

export default CommentList;