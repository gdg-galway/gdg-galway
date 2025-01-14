const functions = require('firebase-functions');
const request = require('request-promise-native');
const rssParser = require('rss-parser');
const rss = new rssParser();

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
    try {
        const feed = await rss.parseURL(`https://medium.com/feed/@gdggalway`);
        return feed && Array.isArray(feed.items) ? feed.items : [];
    }
    catch(e) {
        console.log('MEDIUM_ERROR', e);
        throw new functions.https.HttpsError('aborted', 'Could not fetch posts from Medium.');
    }
});
