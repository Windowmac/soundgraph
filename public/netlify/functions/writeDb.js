const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const soundSchema = new mongoose.Schema({
    name: String,
    binData: Buffer,
  });

const Sound = mongoose.model('Sound', soundSchema);

exports.handler = async (event, context) => {
    await connect;
    const eventBody = JSON.parse(event.body);
    const soundData = Sound.create(eventBody);
    console.log(soundData);

    return {
        statusCode: 200,
        // body: JSON.stringify(newDb),
    }
}