import { IGetItemsRepository } from "../../controllers/get-items/protocols";
import { Item } from "../../models/item";

export class MongoGetItemsRepository implements IGetItemsRepository {
  async getItems(): Promise<Item[]> {
    return [
      {
        id: 1,
        description: "Computer",
        quantity: 10,
        measureUnit: "unit",
      },
    ];
  }
}
