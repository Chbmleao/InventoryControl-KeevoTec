import { ObjectId } from "mongodb";
import {
  IUpdateItemRepository,
  UpdateItemParams,
} from "../../controllers/update-item/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";
import { MongoItem } from "../mongo-protocols";

export class MongoUpdateItemRepository implements IUpdateItemRepository {
  async updateItem(id: string, params: UpdateItemParams): Promise<Item> {
    await MongoClient.db.collection("items").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const item = await MongoClient.db
      .collection<MongoItem>("items")
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      throw new Error("Item not updated");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
