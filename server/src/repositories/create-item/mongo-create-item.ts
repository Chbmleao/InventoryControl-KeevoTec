import {
  CreateItemParams,
  ICreateItemRepository,
} from "../../controllers/create-item/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";
import { MongoItem } from "../mongo-protocols";

export class MongoCreateItemRepository implements ICreateItemRepository {
  async createItem(params: CreateItemParams): Promise<Item> {
    const { insertedId } = await MongoClient.db
      .collection("items")
      .insertOne(params);

    const item = await MongoClient.db
      .collection<MongoItem>("items")
      .findOne({ _id: insertedId });

    if (!item) {
      throw new Error("Item not created");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
