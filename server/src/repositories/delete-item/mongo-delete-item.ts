import { IDeleteItemRepository } from "../../controllers/delete-item/protocols";
import Item, { Item as ItemInterface } from "../../models/item";

export class MongoDeleteItemRepository implements IDeleteItemRepository {
  async deleteItem(id: string): Promise<ItemInterface> {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new Error("Item not found");
    }

    return deletedItem;
  }
}
