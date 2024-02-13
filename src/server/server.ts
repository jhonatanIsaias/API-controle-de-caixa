import express from 'express';
import { router } from './routes';
import 'dotenv/config';
import { connectMongo } from '../dataBase/connectiondb';

const app = express();
app.use(express.json());
app.use(router);
connectMongo();
export { app };
