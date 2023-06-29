import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

const rowHeights: Record<number, number> = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  dummies = [...Array(10)];

  columns = 3;
  rowHeight = rowHeights[this.columns];
  category = "";

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onUpdateColumn(value: number) {
    this.columns = value;
    this.rowHeight = rowHeights[this.columns];
  }

  onUpdateCategory(value: string) {
    this.category = value;
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      product: product.image,
      quantity: 1,
    });
  }
}
