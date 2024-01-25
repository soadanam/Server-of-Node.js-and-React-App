const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000;

// Middleware /body-parser
app.use(cors());
app.use(express.json());


// Mongodb CONNECTION - URI 
const uri = "mongodb+srv://databaseUAE:UFY7v5py2zs1OMIe@cluster0.xwklikq.mongodb.net/?retryWrites=true&w=majority";
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
    //To Create and connection to the "MyDatabaseForClient" database and access it's collection named "Files".
    const database = client.db("DatabaseUAE");
    const usersCollection = database.collection("user");

    // POST method to post user's data in mongodb with their emailId and Pass!
    app.post('/userUpload', async (req, res) => {
      const doc = req.body;
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
  });
  
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


// GET API - home 
app.get('/', (req, res) => {
  res.send("Hello from S.A.S local server page!");
});
app.listen(port, () => {
  console.log(`Listening on my port : ${port}`)
});