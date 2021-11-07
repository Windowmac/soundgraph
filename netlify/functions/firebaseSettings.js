const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

exports.handler = async (event, context) => {
    const settings = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_SENDER_ID,
        appId: process.env.FIREBASE_SENDER_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };

    return {
        statusCode: 200,
        body: JSON.stringify(settings)
      }
};