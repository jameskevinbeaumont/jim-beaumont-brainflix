import React from 'react';
import './MainVideo.scss';

export default function MainVideo({ videoObj }) {
    const iconPlay = './assets/icons/Icon-play.svg';
    const iconPause = './assets/icons/Icon-pause.svg';
    const iconFullScreen = './assets/icons/Icon-fullscreen.svg';
    const iconVolume = './assets/icons/Icon-volume.svg';

    let iconPathPause = iconPause.split("/");
    const iconPauseFile = iconPathPause[iconPathPause.length - 1];

    const playPauseHandler = (e) => {
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

    const volumeHandler = (e) => {
        let video = document.getElementById('video-player');
        let currentVolume = Math.floor(video.volume * 10) / 10;

        if (currentVolume === 0 || currentVolume < 0.8) {
            video.volume += 0.1;
        } else if (currentVolume > 0.81) {
            video.volume = 0;
        };
    };

    const fullScreenHandler = (e) => {
        let video = document.getElementById('video-player');

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
        };
    };

    document.onfullscreenchange = function (e) {
        let video = document.getElementById('video-player');
        let icon = document.getElementById('video-play-icon');

        let iconURL = icon.src.split("/");
        let iconCurrent = iconURL[iconURL.length - 1];

        if ((video.paused || video.ended) && (iconCurrent === iconPauseFile)) {
            icon.src = iconPlay;
        } else {
            icon.src = iconPause;
        };
    };

    const progressHandler = (e) => {
        let video = document.getElementById('video-player');
        let lapsedTime = document.getElementById('video-loader-lapsed');
        let progress = document.getElementById('progress');

        let duration = videoObj.duration.split(":");
        let totalTimeSecs = (Number(duration[0]) * 60) + Number(duration[1]);
        progress.value = (video.currentTime / totalTimeSecs) * 100;

        lapsedTime.innerText = getTime(video.currentTime);
    };

    const getTime = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    };

    const videoEndHandler = (e) => {
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
                onEnded={videoEndHandler}
            >
            </video>
            <div className="video__controls">
                <div className="video__play-container" onClick={playPauseHandler}>
                    <img className="video__play-icon" id="video-play-icon"
                        src={iconPlay}
                        alt="play icon"
                    />
                </div>
                <div className="video__loader-container">
                    <div className="video__loader">
                        <progress id="progress" value="0" max="100">
                        </progress>
                    </div>
                    <div className="video__loader-time">
                        <div className="video__loader-lapsed" id="video-loader-lapsed">0:00</div>
                        <div className="video__loader-time-divider">/</div>
                        <div className="video__loader-duration">{videoObj.duration}</div>
                    </div>
                </div>
                <div className="video__fullscreen-volume-container">
                    <img className="video__fullscreen-icon"
                        onClick={fullScreenHandler}
                        src={iconFullScreen}
                        alt="fullscreen icon" />
                    <img className="video__volume-icon"
                        onClick={volumeHandler}
                        id="video-volume-icon"
                        src={iconVolume}
                        alt="volume icon"
                    />
                </div>
            </div>
        </section>
    );
}
