"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
require("dotenv/config");
const PORT = process.env.PORT || 3333;
server_1.app.listen(PORT, () => console.log('estou funcionando'));
//# sourceMappingURL=index.js.map