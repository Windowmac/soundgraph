const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');

exports.handler = async () => {
  await connect;

  const sounds = await Sound.find({}).catch((err) => {
    console.log(err);
  });
  
  return {
    statusCode: 201,
    body: JSON.stringify(sounds),
  };
};
