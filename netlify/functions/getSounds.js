const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const soundSchema = new mongoose.Schema({
  name: String,
  binData: Buffer,
});

const Sound = mongoose.model('Sound', soundSchema);

exports.handler = async (event, context) => {
  await connect;

  const sounds = await Sound.find({}).catch((err) => {
    console.log(err);
  });
  
  return {
    statusCode: 201,
    body: JSON.stringify(sounds),
  };
};
