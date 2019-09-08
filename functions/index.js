const functions = require('firebase-functions');
const request = require('request-promise-native');

exports.getEvents = functions.https.onCall(async data => {
    let url = `https://api.meetup.com/Google-Developers-Group-in-Galway-Meetup/events?`;
    const {type} = data || {};
    if(type === 'upcoming') url += '&page=3';
    else if(type === 'past') url += '&desc=true&photo-host=public&page=8&status=past';
    else if(type === 'showcase') url += '&desc=true&photo-host=public&sign=true&page=4&status=past';
    try {
        const events = await request(url, { json: true });
        return { events };
    }
    catch(e) {
        console.log('MEETUP_ERROR', e);
        throw new functions.https.HttpsError('aborted', 'Could not fetch events from Meetup.');
    }
});

exports.getPosts = functions.https.onCall(async () => {
    let url = `https://jsonplaceholder.typicode.com/posts`;
    try {
        const posts = await request(url, { json: true });
        return { posts };
    }
    catch(e) {
        console.log('MEDIUM_ERROR', e);
        throw new functions.https.HttpsError('aborted', 'Could not fetch posts from Medium.');
    }
});
