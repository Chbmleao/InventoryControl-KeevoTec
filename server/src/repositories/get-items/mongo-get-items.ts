import { IGetItemsRepository } from "../../controllers/get-items/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";
import { MongoItem } from "../mongo-protocols";

export class MongoGetItemsRepository implements IGetItemsRepository {
  async getItems(): Promise<Item[]> {
    const items = await MongoClient.db
      .collection<MongoItem>("items")
      .find({})
      .toArray();

    return items.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
