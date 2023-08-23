import {
  CreateItemParams,
  ICreateItemRepository,
} from "../../controllers/create-item/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";

export class MongoCreateItem implements ICreateItemRepository {
  async createItem(params: CreateItemParams): Promise<Item> {
    const { insertedId } = await MongoClient.db
      .collection("items")
      .insertOne(params);

    const item = await MongoClient.db
      .collection<Omit<Item, "id">>("items")
      .findOne({ _id: insertedId });

    if (!item) {
      throw new Error("Item not created");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
