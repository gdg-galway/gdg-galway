const functions = require('firebase-functions');
const request = require('request-promise-native');

exports.getEvents = functions.https.onCall(async data => {
    let url = `https://api.meetup.com/Google-Developers-Group-in-Galway-Meetup/events?sign=true`;
    const {type} = data || {};
    if(type === 'upcoming') url += '&photo-host=public&page=3&status=upcoming';
    else if(type === 'past') url += '&desc=true&photo-host=public&page=8&status=past';
    else if(type === 'showcase') url += '&desc=true&photo-host=public&page=4&status=past';
    try {
        const events = await request(url, { json: true });
        return { events };
    }
    catch(e) {
        console.log('MEETUP_ERROR', e);
        throw new functions.https.HttpsError('aborted', 'Could not fetch events from Meetup.');
    }
});
