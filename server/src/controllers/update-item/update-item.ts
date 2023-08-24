import { Item } from "../../models/item";
import { badRequest, internalServerError, ok } from "../helpers";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { IUpdateItemRepository, UpdateItemParams } from "./protocols";

export class UpdateItemController implements IController {
  constructor(private readonly updateItemRepository: IUpdateItemRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateItemParams>
  ): Promise<HttpResponse<Item | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing item id");
      }

      if (!body) {
        return badRequest("Missing fields");
      }

      const allowedFieldsToUpdate: (keyof UpdateItemParams)[] = [
        "description",
        "quantity",
        "measureUnit",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateItemParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const item = await this.updateItemRepository.updateItem(id, body);

      return ok<Item>(item);
    } catch (error) {
      return internalServerError();
    }
  }
}
