import express from "express";
import { config } from "dotenv";
import { GetItemsController } from "./controllers/get-items/get-items";
import { MongoGetItemsRepository } from "./repositories/get-items/mongo-get-items";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/items", async (req, res) => {
    const mongoGetItemsRepository = new MongoGetItemsRepository();
    const getItemsController = new GetItemsController(mongoGetItemsRepository);

    const { body, statusCode } = await getItemsController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
