import { Item } from "../../models/item";
import { IDeleteItemRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { badRequest, internalServerError, ok } from "../helpers";

export class DeleteItemController implements IController {
  constructor(private readonly deleteItemRepository: IDeleteItemRepository) {}

  async handle(
    httpRequest: HttpRequest<Item>
  ): Promise<HttpResponse<Item | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing item id");
      }

      const item = await this.deleteItemRepository.deleteItem(id);

      return ok<Item>(item);
    } catch (error) {
      return internalServerError();
    }
  }
}
