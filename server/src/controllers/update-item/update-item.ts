import { Item } from "../../models/item";
import { HttpResponse, HttpRequest } from "../protocols";
import {
  IUpdateItemController,
  IUpdateItemRepository,
  UpdateItemParams,
} from "./protocols";

export class UpdateItemController implements IUpdateItemController {
  constructor(private readonly updateItemRepository: IUpdateItemRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateItemParams>
  ): Promise<HttpResponse<Item>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing item id",
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing item body",
        };
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
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const item = await this.updateItemRepository.updateItem(id, body);

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
