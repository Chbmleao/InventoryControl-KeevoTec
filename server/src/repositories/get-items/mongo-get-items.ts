import { IGetItemsRepository } from "../../controllers/get-items/protocols";
import Item, { Item as ItemInterface } from "../../models/item";

export class MongoGetItemsRepository implements IGetItemsRepository {
  async getItems(): Promise<ItemInterface[]> {
    const items = await Item.find({}).lean();

    if (!items) {
      return [];
    }

    const mappedItems = items.map((item) => {
      const { _id, ...rest } = item;
      return { id: _id.toHexString(), ...rest };
    });

    return mappedItems;
  }
}
