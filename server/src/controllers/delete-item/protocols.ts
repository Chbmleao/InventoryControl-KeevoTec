import { Item } from "../../models/item";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteItemController {
  handle(httpRequest: HttpRequest<Item>): Promise<HttpResponse<Item>>;
}

export interface IDeleteItemRepository {
  deleteItem(id: string): Promise<Item>;
}
