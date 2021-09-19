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


app.get("/.netlify/functions/getSounds/", async (req, res) => {
  await connect;
  const context = req.apiGateway.context;
  context.callbackWaitsForEmptyEventLoop = false;

  const sounds = await Sound.find({}).catch((err) => {
    console.log(err);
  });

    res.status(200).send(sounds);
});

exports.handler = serverless(app);
