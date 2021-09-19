
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
const Sound = require('./models/Sound.js');


exports.handler = async (event, context) => {
  await connect;
  const eventBody = JSON.parse(event.body);

  console.log(event);
  const soundData = await Sound.create({
    name: eventBody.name,
    url: eventBody.url,
  }).catch((err) => {
    throw new Error(err);
  });

  return {
    statusCode: 200,
    data: soundData
  }
};
