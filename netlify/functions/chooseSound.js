const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');
const fs = require('fs');

exports.handler = async (event) => {
  await connect;

  const eventBody = JSON.parse(event.body);
  console.log('eventBody is: ', eventBody);

  const sound = await Sound.findById(eventBody.id).catch((err) => {
    console.log(err);
  });

  console.log('sound is: ', sound);
  
  return {
    statusCode: 201,
    body: JSON.stringify(sound)
  };
};