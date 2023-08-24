import { Item } from "../models/item";

export type MongoItem = Omit<Item, "id">;
