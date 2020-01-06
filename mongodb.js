const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB');
    }

    console.log('connected correctly!');
    
    const db = client.db(databaseName)

    
    
})




// db.collection('task').findOne({_id: new ObjectID("5e0c68ec64cee80d2ccc1fae")}, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(task);
        
    // })

    // db.collection('task').find({completed: false}).toArray((error, tasks) => {
    //     console.log(tasks);
        
    // })

    // db.collection('users').insertOne({
    //     name:'thinh',
    //     age: 31
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops); 
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'thinh',
    //         age: 31
    //     },
    //     {
    //         name: 'giang',
    //         age: 35
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops); 
    // })

    // db.collection('task').insertMany([
    //     {
    //         description:'invoice hoyu',
    //         completed: false
    //     },
    //     {
    //         description: 'report spiral',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops); 
    // })
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5e0c6000edc56b0cd89fb579")
    // }, {
    //     $set: {
    //         name: 'hai',
    //         age: 37
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result);
        
    // }).catch((error) => {
    //     console.log(error);
        
    // })

    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
        
    // }).catch((error) => {
    //     console.log(error);
        
    // })
    // db.collection('users').deleteMany({
    //     age: 31
    // }).then((result) => {
    //     console.log(result);
        
    // }).catch((error) => {
    //     console.log(error);
        
    // })
    