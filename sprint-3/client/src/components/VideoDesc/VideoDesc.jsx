import React from 'react';
import axios from 'axios';
import './VideoDesc.scss';
import { generateTimeStamp } from '../../js/util';

export default function VideoDesc({ videoObj }) {
    const iconViews = './assets/icons/Icon-views.svg';
    const iconLikes = './assets/icons/Icon-likes.svg';
    let likes = videoObj.likes;

    const incrementLikes = (e) => {
        axios.put(`${window.$BF_URL}${window.$BF_VIDEOS}/${videoObj.id}/likes`, {
            likes: videoObj.likes
        })
            .then(result => {
                likes = result.data
                let likeCount = document.getElementById('likes-count')
                likeCount.innerText = likes
            })
            .catch(err => {
                console.log('Error=>', err.response)
            });
    };

    return (
        // Video Description section
        <section className="videodesc">
            <h2 className="videodesc__title">{videoObj.title}</h2>
            <div className="videodesc__header">
                <div className="videodesc__header-left">
                    <h4 className="videodesc__author">By {videoObj.channel}</h4>
                    <h5 className="videodesc__date">{generateTimeStamp(videoObj.timestamp)}</h5>
                </div>
                <div className="videodesc__header-right">
                    <img className="videodesc__view-img" src={iconViews} alt="views icon" />
                    <h4 className="videodesc__view-count">{videoObj.views}</h4>
                    <img className="videodesc__like-img" onClick={incrementLikes}
                        src={iconLikes} alt="likes icon" />
                    <h4 className="videodesc__like-count"
                        id="likes-count">{likes}</h4>
                </div>
            </div>
            <div className="videodesc-details">
                <h4 className="videodesc-details__paragraph">{videoObj.description}</h4>
            </div>
        </section>
    );
}