const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3001;
const uri = "mongodb://localhost:27017";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

app.get("/books", async (req, res) => {
  console.log("get request done");
  const myDB = client.db("crudDB");
  const myColl = myDB.collection("books");
  //const all = await myColl.find({ name: "Harry Potter" });
  const all = await myColl.find({});
  let books = [];
  for await (const doc of all) {
    books.push(doc);
  }
  res.json(books);
});

app.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    const myDB = client.db("crudDB");
    const myColl = myDB.collection("books");
    const result = await myColl.insertOne(req.body);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(200).json({ message: "Livro cadastrado com sucesso" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao cadastrar o livro" });
  }
});

run().catch(console.dir);
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}`)
);
