import { Item } from "../../models/item";
import { IDeleteItemRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../protocols";

export class DeleteItemController implements IController {
  constructor(private readonly deleteItemRepository: IDeleteItemRepository) {}

  async handle(httpRequest: HttpRequest<Item>): Promise<HttpResponse<Item>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing item id",
        };
      }

      const item = await this.deleteItemRepository.deleteItem(id);

      return {
        statusCode: 200,
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
