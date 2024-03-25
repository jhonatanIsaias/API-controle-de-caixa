"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = exports.client = exports.dbName = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.URL_MONGO || '';
exports.dbName = process.env.BDNAME;
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
});
const connectMongo = async () => {
    try {
        await exports.client.connect();
        console.log('conectado ao mongo db');
        return exports.client.db(exports.dbName).command({ ping: 1 });
    }
    catch (error) {
        console.log('error ao conectar ao mongo db', error);
    }
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=connectiondb.js.map