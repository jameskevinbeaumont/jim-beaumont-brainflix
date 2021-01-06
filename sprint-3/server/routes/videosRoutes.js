const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.route('/')
    // Read - GET Videos method
    .get((_req, res) => {
        fs.readFile('./data/videos.json', (err, data) => {
            if (err) {
                res.status(500).send('Unable to locate the video data');
            } else {
                res.status(200).send(JSON.parse(data));
            };
        });
    });

router.route('/:id')
    // Read - GET Video Detail by ID method
    .get((req, res) => {
        // Read the videos-detail.json file and return the data
        fs.readFile('./data/videos-detail.json', async (err, data) => {
            if (err) {
                res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get the video detail associated with the ID passed
                const videoDetail = await JSON.parse(data).filter(video => video.id === req.params.id);
                if (videoDetail && videoDetail.length > 0) {
                    res.status(200).send(videoDetail);
                } else {
                    res.status(400).send(`No video with that id (${req.params.id}) exists`);
                };
            };
        });
    });

router.route('/:id/comments')
    // Write - POST Comment for Video by Video ID method
    .post((req, res) => {
        // Get the video detail based on the ID passed
        fs.readFile('./data/videos-detail.json', async (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get all of the video detail records
                const videoDetails = await JSON.parse(data);
                // Get the index of the video detail associated with the id passed
                const videoIndex = videoDetails.findIndex(video => video.id === req.params.id);
                if (videoIndex === -1) {
                    return res.status(400).send(`No video with that id (${req.params.id}) exists`);
                };
                // Get the new comment data to be saved
                const commentData = req.body;
                // Check if comment data is complete
                if (commentData.name == null || commentData.comment == null) {
                    return res.status(401).send('Comment data is incomplete');
                }
                // Build the new comment object
                let newComment = {
                    name: commentData.name,
                    comment: commentData.comment,
                    id: uuidv4(),
                    likes: 0,
                    timesstamp: Date.now()
                }
                // Append the comment data
                videoDetails[videoIndex].comments.push(newComment);
                // Finally, save the entire file with the updated Video Detail object
                const stringifyData = JSON.stringify(videoDetails);
                fs.writeFile('./data/videos-detail.json', stringifyData, 'utf8', (err) => {
                    if (err) {
                        res.status(400).send(`Error writing file: ${err}`);
                    } else {
                        // res.status(200).send(videoDetails[videoIndex].comments);
                        res.status(200).send(newComment);
                    };
                });
            };
        });
    });

router.route('/:videoId/comments/:commentId')
    // Delete - DELETE Comment from Video Detail by Video ID and Comment ID method
    .delete((req, res) => {
        // Get the video detail based on the ID passed
        fs.readFile('./data/videos-detail.json', async (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the video detail data`);
            } else {
                // Get all of the video detail records
                const videoDetails = await JSON.parse(data);
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