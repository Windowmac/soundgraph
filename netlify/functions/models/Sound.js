const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const soundSchema = new mongoose.Schema({
    name: String,
    binData: {
      type: Buffer,
      required: true
    },
  });
  
  const Sound = mongoose.model('Sound', soundSchema);

module.exports = Sound;