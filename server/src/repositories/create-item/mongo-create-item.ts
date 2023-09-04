import {
  CreateItemParams,
  ICreateItemRepository,
} from "../../controllers/create-item/protocols";
import Item, { Item as ItemInterface } from "../../models/item";

export class MongoCreateItemRepository implements ICreateItemRepository {
  async createItem(params: CreateItemParams): Promise<ItemInterface> {
    try {
      const newItem = new Item({
        description: params.description,
        quantity: params.quantity,
        measureUnit: params.measureUnit,
      });

      const savedItem = await newItem.save();

      const mappedItem = savedItem as ItemInterface;

      return mappedItem;
    } catch (error) {
      throw new Error("Item not created");
    }
  }
}
