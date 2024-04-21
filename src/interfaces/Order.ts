import { EOrderStatus } from "@/enums";
import IAddress from "@/interfaces/address";
import IFoodList from "@/interfaces/FoodList";

interface IOrder {
  _id: string;
  address: IAddress;
  amount: number;
  date: Date;
  items: IFoodList[];
  payment: boolean;
  status: EOrderStatus;
  userId: string;
}

export default IOrder;

