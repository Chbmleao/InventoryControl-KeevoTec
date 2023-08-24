import { ObjectId } from "mongodb";
import { IDeleteItemRepository } from "../../controllers/delete-item/protocols";
import { MongoClient } from "../../database/mongo";
import { Item } from "../../models/item";

export class MongoDeleteItemRepository implements IDeleteItemRepository {
  async deleteItem(id: string): Promise<Item> {
    const item = await MongoClient.db
      .collection<Omit<Item, "id">>("items")
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      throw new Error("Item not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("items")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Item not deleted");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
