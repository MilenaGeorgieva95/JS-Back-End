import mongodb from 'mongodb';

import {MongoClient} from'mongodb';

const client= new mongodb.MongoClient('mongodb://localhost:27017');

try {
    await client.connect();
    console.log('Connected successfully');
} catch (error) {
    console.log(error)
}

const db=client.db('catShelter');
const collection=db.collection('catsCollection');

//Use same comands as through GitBash run
const result=await collection.find().toArray();
console.log(result);

