import { Item } from "../../models/item";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateItemController {
  handle(
    httpRequest: HttpRequest<CreateItemParams>
  ): Promise<HttpResponse<Item>>;
}

export interface CreateItemParams {
  description: string;
  quantity: number;
  measureUnit: string;
}

export interface ICreateItemRepository {
  createItem(params: CreateItemParams): Promise<Item>;
}
