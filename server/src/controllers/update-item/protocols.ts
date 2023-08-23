import { Item } from "../../models/item";
import { HttpResponse, HttpRequest } from "../protocols";

export interface UpdateItemParams {
  description?: string;
  quantity?: number;
  measureUnit?: string;
}

export interface IUpdateItemController {
  handle(
    httpRequest: HttpRequest<UpdateItemParams>
  ): Promise<HttpResponse<Item>>;
}

export interface IUpdateItemRepository {
  updateItem(id: string, params: UpdateItemParams): Promise<Item>;
}
