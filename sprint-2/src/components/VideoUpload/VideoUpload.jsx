import React from 'react';
import './VideoUpload.scss';

export default function VideoUpload() {
    let imagePath = '../../assets/images/Upload-video-preview.jpg';
    return (
        // Video Upload section
        <section className="videoupload">
            <hr className="videoupload__divider-top"></hr>
            <h2 className="videoupload__title">Upload Video</h2>
            <hr className="videoupload__divider-mid"></hr>
            <div className="videoupload__main">
                <div className="videoupload__main-left">
                    <h3 className="videoupload__thumbnail-title">VIDEO THUMBNAIL</h3>
                    <div className="videoupload__thumbnail" style={{ backgroundImage: `url(${imagePath})` }}></div>
                </div>
                <div className="videoupload__main-right">
                    <form className="videoupload__form" id="videoupload_form" action="">
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
                    </form>
                </div>
            </div>
            <hr className="videoupload__divider-bottom"></hr>
            <div className="videoupload__button-container">
                <button className="videoupload__publish-btn" id="videoupload__publish-btn">PUBLISH</button>
                <button className="videoupload__cancel-btn" id="videoupload__cancel-btn">CANCEL</button>
                {/* type="submit" name="videoupload__form-cancel-btn"
                        value="CANCEL" formNoValidate></input> */}
            </div>
        </section>
    );
}
