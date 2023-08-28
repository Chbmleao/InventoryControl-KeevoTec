import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetItemByIdRepository } from "./protocols";
import { Item } from "../../models/item";
import { internalServerError, ok, badRequest } from "../helpers";

export class GetItemByIdController implements IController {
  constructor(private readonly getItemsRepository: IGetItemByIdRepository) {}

  async handle(
    httpRequest: HttpRequest<Item>
  ): Promise<HttpResponse<Item | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing item id");
      }

      const item = await this.getItemsRepository.getItemById(id);

      return ok<Item>(item);
    } catch (error) {
      return internalServerError();
    }
  }
}
