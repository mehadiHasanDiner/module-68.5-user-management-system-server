const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// usersManagement
// Z3jOhPJkMIRapdDs

const uri =
  "mongodb+srv://usersManagement:Z3jOhPJkMIRapdDs@cluster0.ehabgxd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersManagement = client.db("usersDbCollection").collection("users");

    // data post
    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log("first user", user);
      const result = await usersManagement.insertOne(user);
      res.send(result);
    });

    // data get
    app.get("/users", async (req, res) => {
      const cursor = usersManagement.find();
      // console.log(cursor);
      const result = await cursor.toArray();
      res.send(result);
    });

    // data deleted
    app.delete("/users/:id", async (req, res) => {
      const deleteId = req.params.id;
      const query = { _id: new ObjectId(deleteId) };
      const result = await usersManagement.deleteOne(query);
      res.send(result);
    });

    // Data of single user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersManagement.findOne(query);
      res.send(result);
    });

    // data update
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersManagement.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
