const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
//const fsp = require('fs').promises;

// Route /videos - GET and POST
router.route('/')
    // Read - GET Videos method
    .get((_req, res) => {
        // Get the video list
        fs.readFile('./data/videos.json', (err, data) => {
            if (err) {
                res.status(500).send('Unable to locate the video data');
            } else {
                res.status(200).send(JSON.parse(data));
            };
        });
    })
    // Write - POST New Video
    .post((req, res) => {
        // Get the video list
        fs.readFile('./data/videos.json', (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video data`);
            } else {
                // Get all of the video records
                const videoList = JSON.parse(data);
                // Get the new video data to be saved
                const videoData = req.body;
                // Check if video data is complete
                if (videoData.title === null || videoData.channel === null ||
                    videoData.image === null) {
                    return res.status(401).send('Video data is incomplete');
                }
                // Build the new video object
                let newVideo = {
                    id: uuidv4(),
                    title: videoData.title,
                    channel: videoData.channel,
                    image: videoData.image
                }
                // Append the new video to the list
                videoList.push(newVideo);
                // Finally, save the entire file with the new video
                const stringifyData = JSON.stringify(videoList);
                fs.writeFile('./data/videos.json', stringifyData, 'utf8', (err) => {
                    if (err) {
                        res.status(400).send(`Error writing file: ${err}`);
                    } else {
                        res.status(200).send(newVideo);
                    };
                });
            };
        });
    });

// Route /videos/:id - GET and POST
router.route('/:id')
    // Read - GET Video Detail by ID method
    .get((req, res) => {
        // Read the videos-detail.json file and return the data
        fs.readFile('./data/videos-detail.json', (err, data) => {
            if (err) {
                res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get the video detail associated with the ID passed
                const videoDetailArray = JSON.parse(data).filter(video => video.id === req.params.id);
                const videoDetail = videoDetailArray[0];
                if (videoDetailArray && videoDetailArray.length > 0) {
                    res.status(200).send(videoDetail);
                } else {
                    res.status(400).send(`No video with that id (${req.params.id}) exists`);
                };
            };
        });
    })
    // Write - POST New Video Detail
    .post((req, res) => {
        // Get the video detail based on the ID passed
        fs.readFile('./data/videos-detail.json', (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get all of the video detail records
                const videoDetails = JSON.parse(data);
                // Get the index of the video detail associated with the id passed
                const videoIndex = videoDetails.findIndex(video => video.id === req.params.id);
                if (videoIndex !== -1) {
                    return res.status(400).send(`Video with id (${req.params.id}) already exists - cannot add`);
                };
                // Get the new video data to be saved
                const videoData = req.body;
                // Check if video data is complete
                if (videoData.id === null || videoData.title === null || videoData.channel === null ||
                    videoData.image === null || videoData.description === null || videoData.duration === null ||
                    videoData.video === null) {
                    return res.status(401).send('Video data is incomplete');
                };
                // Build the new Video Detail object
                let newVideo = {
                    id: videoData.id,
                    title: videoData.title,
                    channel: videoData.channel,
                    image: videoData.image,
                    description: videoData.description,
                    views: '0',
                    likes: '0',
                    duration: videoData.duration,
                    video: videoData.video,
                    timestamp: Date.now(),
                    comments: []
                };
                // Append the new Video Detail object
                videoDetails.push(newVideo);
                // Finally, save the entire file with the new Video Detail object
                const stringifyData = JSON.stringify(videoDetails);
                fs.writeFile('./data/videos-detail.json', stringifyData, 'utf8', (err) => {
                    if (err) {
                        res.status(400).send(`Error writing file: ${err}`);
                    } else {
                        res.status(200).send(newVideo);
                    };
                });
            };
        });
    });

// const getVideoDetails = () => {
//     fsp.readFile('./data/videos-detail.json')
//         .then((data) => {
//             //console.log(JSON.parse(data));
//             let videoArray = JSON.parse(data);
//             return videoArray;
//             //return JSON.parse(data);
//         })
//         .catch((err) => { return err });
// };

// Route /videos/:id/comments - POST
router.route('/:id/comments')
    // Write - POST Comment for Video by Video ID method
    .post((req, res) => {
        // Get the video detail based on the ID passed
        // const videoDetails = getVideoDetails();
        // const videoDetails = getVideoDetails();
        // console.log(videoDetails);
        // console.log(getVideoDetails());
        fs.readFile('./data/videos-detail.json', (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get all of the video detail records
                const videoDetails = JSON.parse(data);
                // Get the index of the video detail associated with the id passed
                const videoIndex = videoDetails.findIndex(video => video.id === req.params.id);
                if (videoIndex === -1) {
                    return res.status(400).send(`No video with that id (${req.params.id}) exists`);
                };
                // Get the new comment data to be saved
                const commentData = req.body;
                // Check if comment data is complete
                if (commentData.name === null || commentData.comment === null) {
                    return res.status(401).send('Comment data is incomplete');
                }
                // Build the new comment object
                let newComment = {
                    name: commentData.name,
                    comment: commentData.comment,
                    id: uuidv4(),
                    likes: 0,
                    timestamp: Date.now()
                }
                // Append the comment data
                videoDetails[videoIndex].comments.push(newComment);
                // Finally, save the entire file with the updated Video Detail object
                const stringifyData = JSON.stringify(videoDetails);
                fs.writeFile('./data/videos-detail.json', stringifyData, 'utf8', (err) => {
                    if (err) {
                        res.status(400).send(`Error writing file: ${err}`);
                    } else {
                        res.status(200).send(newComment);
                    };
                });
            };
        });
    });

// Route /videos/:videoId/comments/:commentId - DELETE
router.route('/:videoId/comments/:commentId')
    // Delete - DELETE Comment from Video Detail by Video ID and Comment ID method
    .delete((req, res) => {
        // Get the video detail based on the ID passed
        fs.readFile('./data/videos-detail.json', (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get all of the video detail records
                const videoDetails = JSON.parse(data);
                // Get the index of the video detail associated with the videoId passed
                const videoIndex = videoDetails.findIndex(video => video.id === req.params.videoId);
                if (videoIndex === -1) {
                    return res.status(400).send(`No video with that id (${req.params.videoId}) exists`);
                };
                // Get the index of the comment to be deleted based on commentId passed
                const commentIndex = videoDetails[videoIndex].comments.findIndex(comment => comment.id === req.params.commentId);
                if (commentIndex === -1) {
                    return res.status(400).send(`No comment with that id (${req.params.commentId}) exists`);
                };
                // Remove the comment
                let removedComment = videoDetails[videoIndex].comments.splice(commentIndex, 1);
                const stringifyData = JSON.stringify(videoDetails);
                fs.writeFile('./data/videos-detail.json', stringifyData, 'utf8', (err) => {
                    if (err) {
                        res.status(400).send(`Error writing file: ${err}`);
                    } else {
                        res.status(200).send(removedComment);
                    };
                });
            };
        });
    });

module.exports = router;