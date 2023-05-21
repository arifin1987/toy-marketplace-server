const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
 
app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.59h68ks.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const toyCollection = client.db('toyMarket').collection('carCollection');
    const myToyCollection = client.db('toyMarket').collection('myCollection')
    app.get('/all-toys', async(req,res)=>{
      
      
      const result = await toyCollection.find().toArray();
      res.send(result);

    })

    app.get('/all-toys/:id', async(req,res)=>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)};

      const result = await toyCollection.findOne(query);
      res.send(result);
    })
    
    app.get('/police', async(req,res)=>{
      
      let query={subcategoryName:"PoliceCars"};
      const result = await toyCollection.find(query).limit(2).toArray();
      res.send(result);

    })
    app.get('/fire', async(req,res)=>{
      
      let query={subcategoryName:"FireTrucks"};
      const result = await toyCollection.find(query).limit(2).toArray();
      res.send(result);

    })
    app.get('/sports', async(req,res)=>{
      
      let query={subcategoryName:"SportsCars"};
      const result = await toyCollection.find(query).limit(2).toArray();
      res.send(result);

    })

    app.post('/myCollection', async(req,res)=>{
      const mytoys = req.body;
      console.log(mytoys);
      const result = await myToyCollection.insertOne(mytoys);
      res.send(result);

    })

    app.get('/myCollection', async(req,res)=>{
       const result = await myToyCollection.find().toArray();
       res.send(result);
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, ()=>{
    console.log(`toy marketplace is running on port ${port}`)
})

