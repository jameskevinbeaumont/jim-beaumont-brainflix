import React, { Component } from 'react';
import './sidevideolist.scss';
import SideVideo from '../SideVideo/SideVideo';

class SideVideoList extends Component {
    state = {
        sideVideos: [
            {
            id: 'video-2',
            title: 'Become A Travel Pro In One Easy Lesson',
            channel: 'Scotty Cranmer',
            image: './assets/images/video-list-1.jpg'
            },
            {
            id: 'video-3',
            title: 'Les Houches The Hidden Gem Of The Chamoix',
            channel: 'Scotty Cranmmer',
            image: './assets/images/video-list-2.jpg'
            },
            {
            id: 'video-3',
            title: 'Travel Health Useful Medical Information For',
            channel: 'Scotty Cranmer',
            image: './assets/images/video-list-3.jpg'
            },
            {
            id: 'video-4',
            title: 'Cheap Airline Tickets Great Ways To Save',
            channel: 'Emily Harper',
            image: './assets/images/video-list-4.jpg'
            },
            {
            id: 'video-5',
            title: 'Take A Romantic Break In A Boutique Hotel',
            channel: 'Ethan Owen',
            image: './assets/images/video-list-5.jpg'
            },
            {
            id: 'video-6',
            title: 'Choose The Perfect Accomodations',
            channel: 'Lydia Perez',
            image: './assets/images/video-list-6.jpg'
            },
            {
            id: 'video-7',
            title: 'Cruising Destination Ideas',
            channel: 'Timothy Austin',
            image: './assets/images/video-list-7.jpg'
            },
            {
            id: 'video-8',
            title: 'Train Travel On Track For Safety',
            channel: 'Scotty Cranmer',
            image: './assets/images/video-list-8.jpg'
            }
        ]
    };

    render() {
        return (
            <section className="sidevideolist">
                <h2 className="sidevideolist-title">NEXT VIDEO</h2>
                {this.state.sideVideos.map((sideVideo, index) => <SideVideo key={index} id={sideVideo.id} title={sideVideo.title} channel={sideVideo.channel} image={sideVideo.image}></SideVideo>)}
            </section>
        );
    };
};

export default SideVideoList;