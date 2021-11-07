
require('dotenv').config();
const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
const { Sound, User } = require('./models');

exports.handler = async (event, context) => {
  await connect;
  const sounds = await Sound.find({}).catch((err) => {
    console.log(err);
  });

  return {
    statusCode: 200,
    body: JSON.stringify(sounds)
  }
}
