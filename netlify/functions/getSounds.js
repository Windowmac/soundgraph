const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');

exports.handler = async (event, context) => {
  await connect;
  const sounds = await Sound.find({}).catch((err) => {
    console.log(err);
  });

  console.log(sounds);
  return {
    statusCode: 200,
    body: JSON.stringify(sounds)
  }
}
