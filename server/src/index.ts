import express from "express";
import { config } from "dotenv";
import { GetItemsController } from "./controllers/get-items/get-items";
import { MongoGetItemsRepository } from "./repositories/get-items/mongo-get-items";
import { MongoClient } from "./database/mongo";
import { MongoCreateItemRepository } from "./repositories/create-item/mongo-create-item";
import { CreateItemController } from "./controllers/create-item/create-item";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/items", async (req, res) => {
    const mongoGetItemsRepository = new MongoGetItemsRepository();
    const getItemsController = new GetItemsController(mongoGetItemsRepository);

    const { body, statusCode } = await getItemsController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/items", async (req, res) => {
    const mongoCreateItemRepository = new MongoCreateItemRepository();

    const createItemController = new CreateItemController(
      mongoCreateItemRepository
    );

    const { body, statusCode } = await createItemController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
