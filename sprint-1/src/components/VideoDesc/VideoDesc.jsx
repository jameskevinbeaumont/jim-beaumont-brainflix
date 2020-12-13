import React from 'react';
import './VideoDesc.scss';

export default function VideoDesc ({mainVideoObj}) {
    const iconViews = './assets/icons/Icon-views.svg';
    const iconLikes = './assets/icons/Icon-likes.svg';

    return (
    <section className="videodesc">
        <h2 className="videodesc__title">{mainVideoObj.title}</h2>
        <div className="videodesc__header">
            <div className="videodesc__header--left">
                <h4 className="videodesc__author">By {mainVideoObj.channel}</h4>
                <h5 className="videodesc__date">{mainVideoObj.timestamp}</h5>
            </div>
            <div className="videodesc__header--right">
                <img className="videodesc__view-img" src={iconViews} alt="views icon" />
                <h4 className="videodesc__view-count">{mainVideoObj.views}</h4>
                <img className="videodesc__like-img" src={iconLikes} alt="likes icon" />
                <h4 className="videodesc__like-count">{mainVideoObj.likes}</h4>                
            </div>
        </div>
        <hr className="videodesc__divider"></hr>
        <div className="videodesc-details">
            <h4 className="videodesc-details__paragraph">{mainVideoObj.description}</h4>
        </div>
    </section>
    );
}