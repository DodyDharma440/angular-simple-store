import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const rowHeights: Record<number, number> = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  columns = 3;
  rowHeight = rowHeights[this.columns];
  category = "";

  products: Product[] = [];
  sort = "desc";
  count = "12";

  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => {
        this.products = products;
      });
  }

  onUpdateColumn(value: number) {
    this.columns = value;
    this.rowHeight = rowHeights[this.columns];
  }

  onUpdateCategory(value: string) {
    this.category = value;
    this.getProducts();
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

  onChangeItemsCount(value: string): void {
    this.count = value;
    this.getProducts();
  }

  onChangeSort(value: string): void {
    this.sort = value;
    this.getProducts();
  }
}
