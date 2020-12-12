import React from 'react';
import './MainVideo.scss';

export default function MainVideo ({mainVideoObj}) {
    const iconPlay = './assets/icons/Icon-play.svg';
    const iconFullScreen = './assets/icons/Icon-fullscreen.svg';
    const iconVolume = './assets/icons/Icon-volume.svg';

    return (
    <section className="video">
        <video className="video-player" poster={mainVideoObj.image}>
         </video>
         <div className="video-controls">
            <div className="video-play-container">
                <img className="video-play-icon" src={iconPlay} alt="play icon"/>
            </div>
            <div className="video-loader-container">
                <div className="video-loader"></div>
                <div className="video-loader-time">0:00/0:42</div>
            </div>
            <div className="video-fullscreen-volume-container">
                <img className="video-fullscreen-icon" src={iconFullScreen} alt="fullscreen icon"/>
                <img className="video-volume-icon" src={iconVolume} alt="volume icon"/>
            </div>
        </div>
    </section>
    );
}
