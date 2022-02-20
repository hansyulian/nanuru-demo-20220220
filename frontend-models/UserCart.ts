import { Item } from "./Item";
import { User } from "./User";

export type UserCart = {
  id: string;
  amount: number;
  userId: string;
  itemId: string;
  item: Item;
  user: User;
}