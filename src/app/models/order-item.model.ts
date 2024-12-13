import {Watch} from "./watch.model";

export class OrderItem {
  id!: number;
  idOrders!: number;
  idWatch!: Watch;
  quantity!: number;
  price!: number;
}
