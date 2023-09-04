import { ObjectId } from "mongodb";

import { IGetItemByIdRepository } from "../../controllers/get-item-id/protocols";
import Item, { Item as ItemInterface } from "../../models/item";

export class MongoGetItemByIdRepository implements IGetItemByIdRepository {
  async getItemById(itemId: string): Promise<ItemInterface> {
    const objectId = new ObjectId(itemId);

    const item = await Item.findById(objectId).lean();

    if (!item) {
      throw new Error("Item not found");
    }

    const { _id, ...rest } = item;

    return { id: _id.toHexString(), ...rest };
  }
}
