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
      const requiredFields = ["description", "quantity", "measureUnit"];

      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please, specify a body",
        };
      }

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateItemParams]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
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
