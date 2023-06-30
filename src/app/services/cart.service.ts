import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(product: CartItem): void {
    const items = [...this.cart.value.items];
    const item = items.find((item) => item.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      items.push(product);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart", "OK", { duration: 3000 });
    console.log(
      "🚀 ~ file: cart.service.ts:16 ~ CartService ~ addToCart ~ items:",
      items
    );
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }

  clearCart() {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart cleared", "OK", { duration: 3000 });
  }

  updateQuantity(quantity: number, id: number) {
    const items = [...this.cart.value.items];
    const index = items.findIndex((item) => item.id === id);
    items[index] = { ...items[index], quantity };
    this.cart.next({ items });
  }

  deleteCartItem(id: number) {
    const items = [...this.cart.value.items].filter((i) => i.id !== id);
    this.cart.next({ items });
  }
}
