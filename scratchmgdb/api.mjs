import { MongoClient } from "mongodb";
import express from 'express';

const uri = "mongodb+srv://user:password@cluster0.lxeqtet.mongodb.net/test"
const client = new MongoClient(uri);

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/findOne', async (req,res) => {
        let query = {
            property_type: req.query.property_type,
            bedrooms: parseInt(req.query.bedrooms, 10),
            beds: parseInt(req.query.beds, 10)
        };
        let database = client.db('sample_airbnb');
        let collection = database.collection("listingsAndReviews");
        let returnObj = await collection.findOne(query); 
        let result = {_id: returnObj._id,
                        listing_url: returnObj.listing_url,
                        name:returnObj.name,
                        summary: returnObj.summary,
                        property_type:returnObj.property_type,
                       bedrooms: returnObj.bedrooms,
                    beds: returnObj.beds
                };
        res.type('json');
        res.status(200);
        res.json({
            result: result,
            success: true
    });}
  );

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
    console.log('Express started');
});
