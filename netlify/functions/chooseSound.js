const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');
const fs = require('fs');
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.post('/.netlify/functions/chooseSound', async (req, res) => {
  await connect;
  console.log(req.body);
  const sound = await Sound.findById(req.body.id).catch((err) => {
    console.log(err);
  });

  res.status(200).json(sound);
})

exports.handler = serverless(app);