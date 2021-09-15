const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');

exports.handler = async (event, context) => {
    await connect;
    const eventBody = JSON.parse(event.body);
    const soundData = await Sound.create(eventBody);
    console.log(soundData);

    return {
        statusCode: 201,
        body: JSON.stringify(soundData),
    }
}