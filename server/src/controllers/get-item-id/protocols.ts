import { Item } from "../../models/item";

export interface IGetItemByIdRepository {
  getItemById(itemId: string): Promise<Item>;
}
