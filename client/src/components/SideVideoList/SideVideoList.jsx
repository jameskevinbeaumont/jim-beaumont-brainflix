import React from 'react';
import './SideVideoList.scss';
import SideVideo from '../SideVideo/SideVideo';

export default function SideVideoList({ videoList }) {
    return (
        // Side Video List Section
        <section className="sidevideolist">
            <h2 className="sidevideolist-title">NEXT VIDEO</h2>
            {videoList.map((video) =>
                <SideVideo key={video.id}
                    id={video.id}
                    title={video.title}
                    channel={video.channel}
                    image={video.image}>
                </SideVideo>)}
        </section>
    );
};