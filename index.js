const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// MIDDLEWARE

app.use(cors());
app.use(express.json());


// coffeeJawani
// g6my80reX0bbrLE4







const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.ohkmion.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // await client.connect();


    const coffeeCollection = client.db('coffeeDB').collection('[coffee')


    app.get('/coffee', async(req, res)=>{
        const cursor = coffeeCollection.find();
        const result = await cursor.toArray();
        res.send(result)

    })
    

    app.post('/coffee', async(req, res)=>{
        const Newcoffee = req.body;
        console.log(Newcoffee);

        const result = await coffeeCollection.insertOne(Newcoffee);

        res.send(result)
    })


    app.get('/coffee/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId (id)};
        const result = await coffeeCollection.findOne(query);
        res.send(result);
    })



    app.delete('/coffee/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await coffeeCollection.deleteOne(query);
        res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('making server is running')
});



app.listen(port, ()=>{
    console.log(`coffee server is running in port${port}`);
})