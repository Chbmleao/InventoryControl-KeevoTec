import { Item } from "../../models/item";

export interface CreateItemParams {
  description: string;
  quantity: number;
  measureUnit: string;
}

export interface ICreateItemRepository {
  createItem(params: CreateItemParams): Promise<Item>;
}
