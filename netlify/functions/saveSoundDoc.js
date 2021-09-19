const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/.netlify/functions/saveSoundDoc/', async (req, res) => {
  const context = req.apiGateway.context;
  context.callbackWaitsForEmptyEventLoop = false;

  await connect;

  const soundData = await Sound.create({
    name: req.body.name,
    url: req.body.url,
  }).catch((err) => {
    throw new Error(err);
  });

  res.status(201).json(soundData);
});

exports.handler = serverless(app);
