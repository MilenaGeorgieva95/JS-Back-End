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

await db.createCollection('dogsCollection');
const collectionDogs=db.collection('dogsCollection');

const dog= await collectionDogs.insertOne({
    title: 'Belle',
    body: 'Good dog',
    category: 'Spotty dogs',
    tags: ['dog', 'spotty'],
    user: {
      name: 'Jane Doe',
      status: 'author'
    },
    date: Date()
  })

  console.log(dog);
  
 const dogsRes = await collectionDogs.find({body: 'Good dog'}).toArray();
 console.log(dogsRes);
 
