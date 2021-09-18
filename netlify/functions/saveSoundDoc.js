const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');
const multer = require('multer');
const storage = multer.memoryStorage();

const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/.netlify/functions/saveSoundDoc/',
  async (req, res) => {

    await connect;

    const soundData = await Sound.create({
      name: req.body.name,
      url: req.body.url,
    }).catch((err) => {
      throw new Error(err);
    });
    console.log('soundData is: ', soundData);
    res.status(201).json(soundData);
  }
);

exports.handler = serverless(app);
