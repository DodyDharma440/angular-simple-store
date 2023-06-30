import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

const PUBLIC_KEY =
  "pk_test_51ImEPeErphJAEob6dx8m5BP3r9ktDAb1ie43IvUkocMCGiNtBPh6fjqdvIwzBwtlk0KYdLme7b4hy9AnTqPm524100Uafw2bSl";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  carts: Cart = {
    items: [],
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

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((val) => {
      this.carts = val;
      this.dataSource = this.carts.items;
    });
  }

  getTotal(items: CartItem[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  onChangeQuantity(type: "increase" | "decrease", id: number): void {
    const index = this.dataSource.findIndex((item) => item.id === id);
    const item = this.dataSource[index];

    const quantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;

    this.cartService.updateQuantity(quantity, id);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onDeleteCartItem(id: number) {
    this.cartService.deleteCartItem(id);
  }

  onCheckout() {
    this.http
      .post(`http://localhost:4242/checkout`, {
        items: this.carts.items,
      })
      .subscribe(async (data: any) => {
        let stripe = await loadStripe(PUBLIC_KEY);
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
