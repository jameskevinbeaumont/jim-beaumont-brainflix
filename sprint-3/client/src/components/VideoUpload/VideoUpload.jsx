import React from 'react';
import axios from 'axios';
import './VideoUpload.scss';

export default function VideoUpload() {
    let imagePath = '../../assets/images/Upload-video-preview.jpg';
    let cancelClick = false;

    // Function - Load thumbnail image file selected
    const loadFile = (e) => {
        imagePath = e.target.value;
        const splitString = imagePath.split("\\");
        document.getElementById('vut-1').style.backgroundImage = `url(../../assets/images/${splitString[2]})`;
    };

    // Function - Cancel button clicked
    const cancelUpload = () => {
        cancelClick = true;
    };

    // Function - Form onSubmit - Either Cancel or attempt
    //            to publish the new video
    const videoUpload = (e) => {
        e.preventDefault();
        const form = e.target;

        if (cancelClick) {
            cancelClick = false;
            alert('Upload aborted!');
            window.location.href = '/';
            return;
        };

        // Check for valid input
        if (!form.image.value) {
            alert('Image thumbnail not provided!');
            return;
        };

        if (!form.videouploadTitle.value || form.videouploadTitle.value.trim() === '') {
            alert('Video title not provided!');
            return;
        };

        if (!form.videouploadDesc.value || form.videouploadDesc.value.trim() === '') {
            alert('Video description not provided!');
            return;
        };
        // Set the image and video paths
        let splitString = form.image.value.split("\\");
        let imagePath = `${window.location.protocol}//${window.location.host}/assets/images/${splitString[2]}`;
        let videoPath = `${window.location.protocol}//${window.location.host}/assets/video/Lime Rock - 07-27-2020 - Session 1 (Best Lap).mp4`;
        // Build the new video object
        let newVideo = {
            title: form.videouploadTitle.value,
            channel: 'Jim Beaumont',
            image: imagePath,
            description: form.videouploadDesc.value,
            duration: '1:13',
            video: videoPath
        };
        // Perform an axios POST of the new video
        // First, axios POST to video list
        axios.post(`${window.$BF_URL}${window.$BF_VIDEOS}`, {
            title: newVideo.title,
            channel: newVideo.channel,
            image: imagePath
        })
            .then(result => {
                // Second, axios POST to video detail
                axios.post(`${window.$BF_URL}${window.$BF_VIDEOS}/result.data.id`, {
                    id: result.data.id,
                    title: newVideo.title,
                    channel: newVideo.channel,
                    image: imagePath,
                    description: newVideo.description,
                    duration: newVideo.duration,
                    video: newVideo.video
                })
                    .then(result => {
                        alert(`Video (${result.data.title}) successfully uploaded!`);
                        // Reset the form inputs
                        form.image.value = ''
                        form.videouploadTitle.value = ''
                        form.videouploadDesc.value = ''
                    })
                    .catch(err => {
                        alert(`Video did not upload! Error => ${err.response}`)
                        console.log('Error=>', err.response)
                    });
            })
            .catch(err => {
                alert('Video did not upload - check console for error!')
                console.log('Error=>', err.response)
            });
    };

    return (
        // Video Upload section
        <section className="videoupload">
            <h2 className="videoupload__title">Upload Video</h2>
            <div className="videoupload__main">
                <form className="videoupload__form" id="videoupload_form" onSubmit={videoUpload}>
                    <div className="videoupload__main-left">
                        <h3 className="videoupload__thumbnail-title">VIDEO THUMBNAIL</h3>
                        <div className="videoupload__thumbnail" id="vut-1" style={{ backgroundImage: `url(${imagePath})` }}></div>
                        <label className="videoupload__thumbnail-upload-title" htmlFor="file">UPLOAD IMAGE</label>
                        <input type="file" onChange={loadFile} className="videoupload__thumbnail-upload" accept="image/*" name="image" id="file"></input>
                    </div>
                    <div className="videoupload__main-right">
                        <label className="videoupload__form-label--title" htmlFor="videouploadTitle">TITLE YOUR VIDEO</label>
                        <input
                            className="videoupload__form-input"
                            type="text"
                            name="videouploadTitle"
                            id="videouploadTitle"
                            placeholder="Add a title to your video"></input>
                        <label className="videoupload__form-label--description" htmlFor="videouploadDesc">ADD A VIDEO DESCRIPTION</label>
                        <textarea
                            className="videoupload__form-textarea"
                            rows="7" cols="35"
                            name="videouploadDesc" id="videouploadDesc"
                            placeholder="Add a description of your video"></textarea>
                    </div>
                    <div className="videoupload__button-container">
                        <button className="videoupload__publish-btn" id="videoupload__publish-btn">PUBLISH</button>
                        <button className="videoupload__cancel-btn" id="videoupload__cancel-btn" onClick={cancelUpload}>CANCEL</button>
                    </div>
                </form>
            </div>
        </section>
    );
}