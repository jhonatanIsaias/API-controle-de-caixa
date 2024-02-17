import express from 'express';
import { router } from './routes';
import 'dotenv/config';
import { connectMongo } from '../dataBase/connectiondb';
import { ComanyCollection } from '../dataBase/dbCollections/CompanyCollection';
import { Db } from 'mongodb';
import { client } from '../dataBase/connectiondb';
import { dbName } from '../dataBase/connectiondb';
import { EntradaCollection } from '../dataBase/dbCollections/entradaCollection';

const app = express();
app.use(express.json());
app.use(router);

const DB: Db = client.db(dbName);
connectMongo();
const comanyCollection = new ComanyCollection(DB);
const entradaCollection = new EntradaCollection(DB);
export { app, comanyCollection, entradaCollection };
