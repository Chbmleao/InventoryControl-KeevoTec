import { ObjectId } from "mongodb";

import { IGetItemByIdRepository } from "../../controllers/get-item-id/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";
import { MongoItem } from "../mongo-protocols";

export class MongoGetItemByIdRepository implements IGetItemByIdRepository {
  async getItemById(itemId: string): Promise<Item> {
    const objectId = new ObjectId(itemId);

    const item = await MongoClient.db
      .collection<MongoItem>("items")
      .findOne({ _id: objectId });

    if (!item) {
      throw new Error("Item not created");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
