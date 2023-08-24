import { Item } from "../../models/item";

export interface UpdateItemParams {
  description?: string;
  quantity?: number;
  measureUnit?: string;
}

export interface IUpdateItemRepository {
  updateItem(id: string, params: UpdateItemParams): Promise<Item>;
}
