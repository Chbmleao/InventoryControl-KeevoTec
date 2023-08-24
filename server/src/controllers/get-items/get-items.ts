import { HttpResponse, IController } from "../protocols";
import { IGetItemsRepository } from "./protocols";
import { Item } from "../../models/item";
import { internalServerError, ok } from "../helpers";

export class GetItemsController implements IController {
  constructor(private readonly getItemsRepository: IGetItemsRepository) {}

  async handle(): Promise<HttpResponse<Item[] | string>> {
    try {
      const items = await this.getItemsRepository.getItems();

      return ok<Item[]>(items);
    } catch (error) {
      return internalServerError();
    }
  }
}
