import { Item } from "../../models/item";
import { HttpResponse } from "../protocols";

export interface IGetItemsController {
  handle(): Promise<HttpResponse<Item[]>>;
}

export interface IGetItemsRepository {
  getItems(): Promise<Item[]>;
}
