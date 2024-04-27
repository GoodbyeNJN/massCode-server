import path from "node:path";

import { createDb } from "./db";
import { createServer } from "./server";

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const db = path.resolve(process.env.DB || "db.json");

await createDb(db);
createServer(port, hostname);
