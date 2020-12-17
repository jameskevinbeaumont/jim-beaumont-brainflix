import React from 'react';
import './MainVideo.scss';

export default function MainVideo({ videoObj }) {
    const iconPlay = './assets/icons/Icon-play.svg';
    const iconFullScreen = './assets/icons/Icon-fullscreen.svg';
    const iconVolume = './assets/icons/Icon-volume.svg';
    // console.log('MainVideo.jsx: videoObj', videoObj);

    return (
        // Main video section
        <section className="video">
            <video className="video__player" poster={videoObj.image}>
            </video>
            <div className="video__controls">
                <div className="video__play-container">
                    <img className="video__play-icon" src={iconPlay} alt="play icon" />
                </div>
                <div className="video__loader-container">
                    <div className="video__loader"></div>
                    <div className="video__loader-time">
                        <div className="video__loader-lapsed">0:00</div>
                        <div className="video__loader-time-divider">/</div>
                        <div className="video__loader-duration">{videoObj.duration}</div>
                    </div>
                </div>
                <div className="video__fullscreen-volume-container">
                    <img className="video__fullscreen-icon" src={iconFullScreen} alt="fullscreen icon" />
                    <img className="video__volume-icon" src={iconVolume} alt="volume icon" />
                </div>
            </div>
        </section>
    );
}
