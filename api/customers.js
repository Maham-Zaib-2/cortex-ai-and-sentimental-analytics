import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    await client.connect();
    const db = client.db("cortex");
    const customers = await db
      .collection("customers")
      .find({})
      .toArray();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
