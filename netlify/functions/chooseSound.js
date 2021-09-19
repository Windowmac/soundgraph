const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.MONGO_DB_URI);
const Sound = require('./models/Sound.js');
require('dotenv').config();

exports.handler = async (event, context) => {
  const eventBody = JSON.parse(event.body);
  await connect;
  const sound = await Sound.findById(eventBody.id).catch((err) => {
    console.log(err);
  });
  return {
    statusCode: 200,
    body: JSON.stringify(sound)
  }
};