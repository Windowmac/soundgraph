const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const soundSchema = new mongoose.Schema({
    name: String,
    url: String
  });
  
  const Sound = mongoose.model('Sound', soundSchema);

module.exports = Sound;