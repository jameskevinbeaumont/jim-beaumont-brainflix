// Function - Gets the video data - presently hardcoded 
//            via an object array
export function GetVideoData() {
    return new Promise(function (resolve, reject) {
        const sideVideos =
            [
                {
                    id: 'video-0',
                    title: 'BMX Rampage: 2018 Highlights',
                    channel: 'Red Cow',
                    image: '../../assets/images/video-list-0.jpg'
                },
                {
                    id: 'video-1',
                    title: 'Become A Travel Pro In One Easy Lesson',
                    channel: 'Scotty Cranmer',
                    image: './assets/images/video-list-1.jpg'
                },
                {
                    id: 'video-2',
                    title: 'Les Houches The Hidden Gem Of The Chamoix',
                    channel: 'Scotty Cranmer',
                    image: '../assets/images/video-list-2.jpg'
                },
                {
                    id: 'video-3',
                    title: 'Travel Health Useful Medical Information For',
                    channel: 'Scotty Cranmer',
                    image: '../../../assets/images/video-list-3.jpg'
                },
                {
                    id: 'video-4',
                    title: 'Cheap Airline Tickets Great Ways To Save',
                    channel: 'Emily Harper',
                    image: '../../assets/images/video-list-4.jpg'
                },
                {
                    id: 'video-5',
                    title: 'Take A Romantic Break In A Boutique Hotel',
                    channel: 'Ethan Owen',
                    image: '../../assets/images/video-list-5.jpg'
                },
                {
                    id: 'video-6',
                    title: 'Choose The Perfect Accomodations',
                    channel: 'Lydia Perez',
                    image: '../../assets/images/video-list-6.jpg'
                },
                {
                    id: 'video-7',
                    title: 'Cruising Destination Ideas',
                    channel: 'Timothy Austin',
                    image: '../../assets/images/video-list-7.jpg'
                },
                {
                    id: 'video-8',
                    title: 'Train Travel On Track For Safety',
                    channel: 'Scotty Cranmer',
                    image: '../../assets/images/video-list-8.jpg'
                }
            ]
        if (sideVideos && sideVideos.length > 0) {
            resolve(sideVideos);
        } else {
            reject(Error("Error loading videos!"));
        };
    });
}

// Function - Initializes the main video object 
export function InitializeMVO() {
    const mainVideo =
    {
        id: '',
        title: '',
        description: '',
        channel: '',
        image: '',
        views: '',
        likes: '',
        duration: '',
        video: '',
        timestamp: 0,
        comments: []
    }

    return mainVideo;
}

// Function - Gets the main video object - presently hardcoded 
//            via an object and the argument passed (firstVideo)
//            is not used
export function GetMainVideoObject(firstVideo) {
    return new Promise(function (resolve, reject) {
        // Would use firstVideo to GET video details from API...

        const mainVideo =
        {
            id: 'video-0',
            title: 'BMX Rampage: 2018 Highlights',
            description: 'On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels, unleashing some of the biggest moments the sport has ever seen. While mother nature only allowed for one full run before the conditions made it impossible to ride, that was all that was needed for event veteran Kyle Strait, who won the event for the second time -- eight years after his first Red Cow Rampage title.',
            channel: 'Red Cow',
            image: '../../assets/images/video-list-0.jpg',
            views: '1,001,023',
            likes: '110,985',
            duration: '4:45',
            video: 'MP4',
            timestamp: 1530744338878,
            comments: GetCommentData()
        }
        if (Object.entries(mainVideo).length > 0) {
            mainVideo.timestamp = generateTimeStamp(mainVideo.timestamp);
            resolve(mainVideo);
        } else {
            reject(Error("Error loading main video!"));
        };
    });
}

// Function - Gets the comment data for a video. Presently this
//            is hardcoded via an object array
export function GetCommentData() {
    const comments =
        [
            {
                commentID: 1,
                commentName: 'Michael Lyons',
                commentDate: '11/17/2020 08:14:27',
                commentTS: '',
                commentText: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
            },
            {
                commentID: 2,
                commentName: 'Gary Wong',
                commentDate: '05/12/2020 23:24:00',
                commentTS: '',
                commentText: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
            },
            {
                commentID: 3,
                commentName: 'Theodore Duncan',
                commentDate: '08/15/2018 15:48:57',
                commentTS: '',
                commentText: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!'
            }
        ]

    comments.forEach(function (comment) {
        let newDate = new Date(comment.commentDate);
        let newTime = newDate.getTime();
        comment.commentTS = generateTimeStamp(newTime);
    })

    return comments;
}

// Function - Generate timestamp (Diving Deeper functionality)
export function generateTimeStamp(commentObjDate) {
    let currentDate = new Date();
    let commentDate = new Date(commentObjDate);
    let currentTime = Math.round(currentDate.getTime() / 1000);
    let commentTime = Math.round(commentDate.getTime() / 1000);
    let diffMins = (currentTime - commentTime) / 60;
    let diffHours = parseInt(Math.round(diffMins / 60));
    let diffDays = parseInt(Math.round(diffHours / 24));
    let diffWeeks = parseInt(Math.round(diffDays / 7));
    let diffMonths = parseInt(Math.round(diffWeeks / 4));
    let diffYears = parseInt(Math.round(diffMonths / 12));
    let tsText = '';

    switch (true) {
        case (diffMins < 1):
            tsText = '< 1 minute ago';
            break;
        case (diffMins < 2):
            tsText = `${parseInt(diffMins)} minute ago`;
            break;
        case (diffMins < 60):
            tsText = `${parseInt(diffMins)} minutes ago`;
            break;
        case (diffHours === 1):
            tsText = `1 hour ago`;
            break;
        case (diffHours < 24):
            tsText = `${parseInt(diffHours)} hours ago`;
            break;
        case (diffHours < 48):
            tsText = `1 day ago`;
            break;
        case (diffDays < 8):
            tsText = `${diffDays} days ago`;
            break;
        case (diffWeeks < 2):
            tsText = `1 week ago`;
            break;
        case (diffWeeks < 5):
            tsText = `${diffWeeks} weeks ago`;
            break;
        case (diffMonths < 2):
            tsText = `1 month ago`;
            break;
        case (diffMonths < 12):
            tsText = `${diffMonths} months ago`;
            break;
        case (diffYears < 2):
            tsText = `1 year ago`;
            break;
        case (diffYears >= 2):
            tsText = `${diffYears} years ago`;
            break;
        default:
    };

    return tsText;
};
