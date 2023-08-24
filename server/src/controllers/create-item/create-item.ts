import { Item } from "../../models/item";
import { badRequest, created, internalServerError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateItemParams, ICreateItemRepository } from "./protocols";

export class CreateItemController implements IController {
  constructor(private readonly createItemRepository: ICreateItemRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateItemParams>
  ): Promise<HttpResponse<Item | string>> {
    try {
      const requiredFields = ["description", "quantity", "measureUnit"];

      if (!httpRequest.body) {
        return badRequest("Please, specify a body");
      }

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateItemParams]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const item = await this.createItemRepository.createItem(httpRequest.body);

      return created<Item>(item);
    } catch (error) {
      return internalServerError();
    }
  }
}
