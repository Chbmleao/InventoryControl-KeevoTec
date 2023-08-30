import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { MongoClient } from "./database/mongo";
import itemRoutes from "./routes";

const main = async () => {
  config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  await MongoClient.connect();

  itemRoutes(app);

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
