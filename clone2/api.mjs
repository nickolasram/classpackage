import { MongoClient } from "mongodb";
import express from 'express';
import cors from 'cors';
import url from 'url';

const uri = "mongodb+srv://NAME:PASS@cluster0.lxeqtet.mongodb.net/test"
const client = new MongoClient(uri);

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors());

app.post('/findOne', async (req,res) => {
    let url_parts = url.parse(req.url, true);
    let nquery = url_parts.query;
    let query = {};
    Object.assign(query, nquery);
    // query.beds = parseFloat(query.beds);
    let database = client.db(query.database);
    let collection = database.collection(query.collection);
    delete query.database;
    delete query.collection;
    for (var property in query) {
        if (!isNaN(parseInt(query[property]))){
            query[property] = parseFloat(query[property]);
          }
    }
    let returnObj = await collection.findOne(query); 
    console.log(returnObj);
    res.type('json');
    res.status(200);
    res.json({
        return: JSON.stringify(returnObj),
        success: true
    });
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});
