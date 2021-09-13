const fs = require('fs');
exports.handler = async (event, context) => {
    const eventBody = event.body;
    console.log('eventBody is: ', eventBody);
    // const newDb = [event.body];
    // fs.writeFile(
    //     './db/tempDb.txt', 
    //     `const db = ${newDb}; module.exports = db;`, 
    //     (err) => {
    //         console.log(err);
    // });
    return {
        statusCode: 200,
        // body: JSON.stringify(newDb),
    }
}