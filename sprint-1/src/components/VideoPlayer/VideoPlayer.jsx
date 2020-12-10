import React from 'react';
import './videoplayer.scss';
import vidImage from '../../assets/images/video-list-0.jpg';
import iconPlay from '../../assets/icons/Icon-play.svg';
import iconFullScreen from '../../assets/icons/Icon-fullscreen.svg';
import iconVolume from '../../assets/icons/Icon-volume.svg';

export default function VideoPlayer () {
    return (
    <section className="video">
        <video className="video-player" poster={vidImage}>
         </video>
         <div className="video-controls">
            <div className="video-play-container">
                <img className="video-play-icon" src={iconPlay} alt="play icon"/>
            </div>
            <div className="video-loader-container">
                <div className="video-loader"></div>
            </div>
            <div className="video-fullscreen-volume-container">
                <img className="video-fullscreen-icon" src={iconFullScreen} alt="fullscreen icon"/>
                <img className="video-volume-icon" src={iconVolume} alt="volume icon"/>
            </div>
        </div>
    </section>
    );
}
