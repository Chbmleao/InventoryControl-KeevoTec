import { Item } from "../../models/item";

export interface IDeleteItemRepository {
  deleteItem(id: string): Promise<Item>;
}
