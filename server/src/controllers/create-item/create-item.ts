import { Item } from "../../models/item";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateItemParams,
  ICreateItemController,
  ICreateItemRepository,
} from "./protocols";

export class CreateItemController implements ICreateItemController {
  constructor(private readonly createItemRepository: ICreateItemRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateItemParams>
  ): Promise<HttpResponse<Item>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const item = await this.createItemRepository.createItem(httpRequest.body);

      return {
        statusCode: 201,
        body: item,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
