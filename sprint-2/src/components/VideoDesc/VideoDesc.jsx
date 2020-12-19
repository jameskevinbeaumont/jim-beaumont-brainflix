import React from 'react';
import './VideoDesc.scss';
import { generateTimeStamp } from '../../js/loadSampleData';

export default function VideoDesc({ videoObj }) {
    const iconViews = './assets/icons/Icon-views.svg';
    const iconLikes = './assets/icons/Icon-likes.svg';

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
                    <img className="videodesc__like-img" src={iconLikes} alt="likes icon" />
                    <h4 className="videodesc__like-count">{videoObj.likes}</h4>
                </div>
            </div>
            {/* <hr className="videodesc__divider"></hr> */}
            <div className="videodesc-details">
                <h4 className="videodesc-details__paragraph">{videoObj.description}</h4>
            </div>
        </section>
    );
}