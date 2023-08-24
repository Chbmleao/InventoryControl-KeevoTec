import { Item } from "../../models/item";

export interface IGetItemsRepository {
  getItems(): Promise<Item[]>;
}
