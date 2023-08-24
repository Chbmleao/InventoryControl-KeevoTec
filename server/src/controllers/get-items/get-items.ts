import { IController } from "../protocols";
import { IGetItemsRepository } from "./protocols";

export class GetItemsController implements IController {
  constructor(private readonly getItemsRepository: IGetItemsRepository) {}

  async handle() {
    try {
      const items = await this.getItemsRepository.getItems();

      return {
        statusCode: 200,
        body: items,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
