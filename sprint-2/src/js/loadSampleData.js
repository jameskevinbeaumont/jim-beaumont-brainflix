// Function - Initializes the active video detail object 
export function InitializeAVD() {
    const activeVideoDetail =
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

    return activeVideoDetail;
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
