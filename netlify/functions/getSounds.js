
require('dotenv').config();
const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
const Sound = require('./models/Sound.js');
console.log('this is process env: ', process.env.MONGO_DB_URI);

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
