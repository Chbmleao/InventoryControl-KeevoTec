import { ObjectId } from "mongodb";
import {
  IUpdateItemRepository,
  UpdateItemParams,
} from "../../controllers/update-item/protocols";
import Item, { Item as ItemInterface } from "../../models/item";

export class MongoUpdateItemRepository implements IUpdateItemRepository {
  async updateItem(
    id: string,
    params: UpdateItemParams
  ): Promise<ItemInterface> {
    const objectId = new ObjectId(id);

    const updatedItem = await Item.findByIdAndUpdate(
      objectId,
      { $set: params },
      { new: true }
    ).lean();

    if (!updatedItem) {
      throw new Error("Item not updated");
    }

    const { _id, ...rest } = updatedItem;

    return { id: _id.toHexString(), ...rest };
  }
}
