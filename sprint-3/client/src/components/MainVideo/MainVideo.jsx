import React from 'react';
import './MainVideo.scss';

export default function MainVideo({ videoObj }) {
    const iconPlay = './assets/icons/Icon-play.svg';
    const iconPause = './assets/icons/Icon-pause.svg';
    const iconFullScreen = './assets/icons/Icon-fullscreen.svg';
    const iconVolume = './assets/icons/Icon-volume.svg';

    const playPause = (e) => {
        let video = document.getElementById('video-player');
        let icon = document.getElementById('video-play-icon');

        if (video.paused || video.ended) {
            video.play();
            icon.src = iconPause;
        } else {
            video.pause();
            icon.src = iconPlay;
        };
    };

    const volumeUpDown = (e) => {
        let video = document.getElementById('video-player');
        let currentVolume = Math.floor(video.volume * 10) / 10;

        if (currentVolume === 0 || currentVolume < 0.8) {
            video.volume += 0.1;
        } else if (currentVolume > 0.81) {
            video.volume = 0;
        };
    };

    const progressHandler = (e) => {
        let video = document.getElementById('video-player');
        let lapsedTime = document.getElementById('video-loader-lapsed');

        lapsedTime.innerText = getTime(video.currentTime);
    };

    const getTime = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    };

    const videoEnd = (e) => {
        let icon = document.getElementById('video-play-icon');

        icon.src = iconPlay;
    };

    return (
        // Main video section
        <section className="video">
            <video className="video__player" id="video-player"
                poster={videoObj.image}
                src={videoObj.video + window.$BF_API_KEY}
                onTimeUpdate={progressHandler}
                onEnded={videoEnd}
            >
            </video>
            <div className="video__controls">
                <div className="video__play-container" onClick={playPause}>
                    <img className="video__play-icon" id="video-play-icon"
                        src={iconPlay}
                        alt="play icon"
                    />
                </div>
                <div className="video__loader-container">
                    <div className="video__loader"></div>
                    <div className="video__loader-time">
                        <div className="video__loader-lapsed" id="video-loader-lapsed">0:00</div>
                        <div className="video__loader-time-divider">/</div>
                        <div className="video__loader-duration">{videoObj.duration}</div>
                    </div>
                </div>
                <div className="video__fullscreen-volume-container">
                    <img className="video__fullscreen-icon" src={iconFullScreen} alt="fullscreen icon" />
                    <img className="video__volume-icon"
                        onClick={volumeUpDown}
                        id="video-volume-icon"
                        src={iconVolume}
                        alt="volume icon"
                    />
                </div>
            </div>
        </section>
    );
}
