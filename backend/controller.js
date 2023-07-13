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

const getByName = async (searchName) => {
  const myDB = client.db("crudDB");
  const myColl = myDB.collection("books");
  const query = { name: searchName };
  return await myColl.findOne(query);
};

const deleteByName = async (name) => {
  const myDB = client.db("crudDB");
  const myColl = myDB.collection("books");
  const query = { name: name };
  const result = await myColl.deleteOne(query);

  if (result.deletedCount === 1) {
    return "Successfully deleted one document.";
  } else {
    return "No documents matched the query. Deleted 0 documents.";
  }
};

const isAlreadyRegistered = async (key) => {
  const myDB = client.db("crudDB");
  const myColl = myDB.collection("books");
  const query = { name: key };
  let response = await myColl.findOne(query);
  return response !== null;
};

app.get("/books", async (req, res) => {
  console.log("get request done");
  const myDB = client.db("crudDB");
  const myColl = myDB.collection("books");
  const all = await myColl.find({});
  let books = [];
  for await (const doc of all) {
    books.push(doc);
  }
  res.json(books);
});

app.get("/book", async (req, res) => {
  console.log("get one request done");
  let book = await getByName(req);
  res.json(book);
});

app.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;

    if (await isAlreadyRegistered(name)) {
      res.status(403).json({ error: "Livro já cadastrado" });
      return;
    }

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

app.delete("/book", async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const result = await deleteByName(name);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao deletar o livro" });
  }
});

app.put("/book", async (req, res) => {
  try {
    console.log(req.body);
    const myDB = client.db("crudDB");
    const myColl = myDB.collection("books");
    const { name, title } = req.body;
    const filter = { name: name };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        name: name,
        title: title,
      },
    };
    const result = await myColl.updateOne(filter, updateDoc, options);
    console.log(`A document was updated with the _id: ${result.modifiedCount}`);
    res.status(200).json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao atualizar o livro" });
  }
});

run().catch(console.dir);
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}`)
);
