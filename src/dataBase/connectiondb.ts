import { MongoClient } from 'mongodb';

const uri = process.env.URL_MONGO || '';
export const dbName = process.env.BDNAME;

export const client = new MongoClient(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
});

export const connectMongo = async () => {
  try {
    await client.connect();
    console.log('conectado ao mongo db');
    return client.db(dbName).command({ ping: 1 });
  } catch (error) {
    console.log('error ao conectar ao mongo db', error);
  }
};
