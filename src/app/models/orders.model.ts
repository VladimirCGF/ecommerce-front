import {OrderItem} from "./order-item.model";

export class Orders {
  id!: number;
  orderDate!: Date;
  totalPrice!: number;
  idClient!: number;
  idAddress!: number;
  status!: string;
  coupon!: string;
  orderItems!: OrderItem[];
}
