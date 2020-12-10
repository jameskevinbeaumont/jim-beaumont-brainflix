import React, { Component } from 'react';
import './sidevideo.scss';

class SideVideo extends Component {
    render() {
        let {id, title, channel, image} = this.props;

        return (
            <div className="sidevideo" id={id}>
                <div className="sidevideo__image">
                    <img className="sidevideo-image" src={image} alt=""/>
                </div>
                <div className="sidevideo__detail">
                    <div className="sidevideo__title">
                        <p className="sidevideo__title-text">{title}</p>
                    </div>
                    <div className="sidevideo__channel">
                        <p className="sidevideo__channel-text">{channel}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideVideo;