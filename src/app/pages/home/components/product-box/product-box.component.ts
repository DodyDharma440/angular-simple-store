import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidth = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
