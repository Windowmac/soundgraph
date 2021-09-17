const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/test');
const Sound = require('./models/Sound.js');
const fs = require('fs');

exports.handler = async (event, context) => {
    await connect;
    const eventBody = JSON.parse(event.body);
    console.log('event is: ', eventBody);


        const soundData = await Sound.create({name: soundName, binData: eventBody});
        console.log('soundData is: ', soundData);
        return {
            statusCode: 201,
            body: JSON.stringify(soundData)
        }

    // const find = await Sound.find().catch(err => {console.log(err)});

    // let nameNumber;
    // while(find.length > 3){
    //     const remove = find.pop();
    //     nameNumber = parseInt(remove.name) + 1;
    //     await Sound.deleteOne({name: remove.name}).catch(err => {console.log(err)});
    // }
    
    // const soundName = nameNumber;
    // const soundData = await Sound.create({name: soundName, binData: eventBody});
    // console.log('soundData is: ', soundData);

}