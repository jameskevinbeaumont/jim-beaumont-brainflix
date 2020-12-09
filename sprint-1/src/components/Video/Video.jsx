import React from 'react';
import './Video.scss';
import vidImage from '../../assets/images/video-list-0.jpg';
// import vidPlay from '../../assets/icons/Icon-play.svg';

export default function Video () {
    return (
    <section className="video">
        <video className="video-player" poster={vidImage} controls>
        </video>
        {/* <img className="video-play-icon" src={vidPlay} alt="play icon"/> */}
    </section>
    );
}
