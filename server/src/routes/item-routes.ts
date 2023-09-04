import express from "express";

import { GetItemsController } from "../controllers/get-items/get-items";
import { MongoGetItemsRepository } from "../repositories/get-items/mongo-get-items";
import { GetItemByIdController } from "../controllers/get-item-id/get-item-id";
import { MongoGetItemByIdRepository } from "../repositories/get-item-id/mongo-get-item-id";
import { MongoCreateItemRepository } from "../repositories/create-item/mongo-create-item";
import { CreateItemController } from "../controllers/create-item/create-item";
import { MongoUpdateItemRepository } from "../repositories/update-item/mongo-update-item";
import { UpdateItemController } from "../controllers/update-item/update-item";
import { MongoDeleteItemRepository } from "../repositories/delete-item/mongo-delete-item";
import { DeleteItemController } from "../controllers/delete-item/delete-item";

const itemRoutes = (app: express.Application) => {
  const router = express.Router();

  router.get("/items", async (req, res) => {
    const mongoGetItemsRepository = new MongoGetItemsRepository();
    const getItemsController = new GetItemsController(mongoGetItemsRepository);

    const { body, statusCode } = await getItemsController.handle();
    res.status(statusCode).send(body);
  });

  router.get("/items/:id", async (req, res) => {
    const mongoGetItemByIdRepository = new MongoGetItemByIdRepository();
    const getItemByIdController = new GetItemByIdController(
      mongoGetItemByIdRepository
    );

    const { body, statusCode } = await getItemByIdController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  router.post("/items", async (req, res) => {
    const mongoCreateItemRepository = new MongoCreateItemRepository();
    const createItemController = new CreateItemController(
      mongoCreateItemRepository
    );

    const { body, statusCode } = await createItemController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  router.patch("/items/:id", async (req, res) => {
    const mongoUpdateItemRepository = new MongoUpdateItemRepository();
    const updateItemController = new UpdateItemController(
      mongoUpdateItemRepository
    );

    const { body, statusCode } = await updateItemController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  router.delete("/items/:id", async (req, res) => {
    const mongoDeleteItemRepository = new MongoDeleteItemRepository();
    const deleteItemController = new DeleteItemController(
      mongoDeleteItemRepository
    );

    const { body, statusCode } = await deleteItemController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.use(router);
};

export default itemRoutes;
