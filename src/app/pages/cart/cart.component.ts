import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  carts: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 2,
      },
    ],
  };
  dataSource: CartItem[] = [];
  columns: Record<"label" | "key", string>[] = [
    { label: "Product", key: "product" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
    { label: "Total", key: "total" },
    { label: "Action", key: "action" },
  ];
  displayCols = this.columns.map((col) => col.key);

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.carts.items;
  }

  getTotal(items: CartItem[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  getQuantity(id: number): number {
    return this.dataSource.find((item) => item.id === id)?.quantity || 0;
  }

  onChangeQuantity(type: "increase" | "decrease", id: number): void {
    const index = this.dataSource.findIndex((item) => item.id === id);
    const item = this.dataSource[index];

    const quantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;

    this.dataSource[index] = { ...item, quantity };
  }
}
