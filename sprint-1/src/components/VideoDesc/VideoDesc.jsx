import React from 'react';
import './videodesc.scss';
import viewsIcon from '../../assets/icons/Icon-views.svg';
import likesIcon from '../../assets/icons/Icon-likes.svg';

export default function VideoDesc () {
    return (
    <section className="videodesc">
        <h2 className="videodesc__title">BMX Rampage: 2018 Highlights</h2>
        <div className="videodesc__header videodesc__header--left">
            <h4 className="videodesc__author">By Red Cow</h4>
            <h5 className="videodesc__date">12/18/2018</h5>
        </div>
        <div className="videodesc__header videodesc__header--right">
            <img className="videodesc__view-img" src={viewsIcon} alt="views icon" />
            <h4 className="videodesc__view-count">1,001,023</h4>
            <img className="videodesc__like-img" src={likesIcon} alt="likes icon" />
            <h4 className="videodesc__like-count">110,985</h4>
        </div>
        <hr className="videodesc__divider"></hr>
        <div className="videodesc-details">
            <h4 className="videodesc-details__paragraph">On a gusty day in Southern Utah, a group of 25
                daring mountain bikers blew the doors off what is
                possible on two wheels, unleashing some of the
                biggest moments the sport has ever seen. While
                mother nature only allowed for one full run before
                the conditions made it impossible to ride, that was
                all that was needed for event veteran Kyle Strait,
                who won the event for the second time -- eight years
                after his first Red Cow Rampage title</h4>
        </div>
    </section>
    );
}