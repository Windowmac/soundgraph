const mongoose = require('mongoose');
const soundSchema = new mongoose.Schema({
    name: String,
    binData: Buffer,
  });
  
  const Sound = mongoose.model('Sound', soundSchema);

module.exports = Sound;