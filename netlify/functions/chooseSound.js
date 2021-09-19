const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.post('/.netlify/functions/chooseSound', async (req, res) => {
  const context = req.apiGateway.context;
  console.log(req);
  context.callbackWaitsForEmptyEventLoop = false;

  await connect;
  const sound = await Sound.findById(req.body.id).catch((err) => {
    console.log(err);
  });

  res.status(200).json(sound);
})

exports.handler = (event, context) => serverless(app);