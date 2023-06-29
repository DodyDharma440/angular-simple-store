import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnCountChange = new EventEmitter<number>();

  sort = "desc";
  itemsCount = 12;

  constructor() {}

  ngOnInit(): void {}

  onChangeSort(value: string) {
    this.sort = value;
  }

  onChangeItems(count: number) {
    this.itemsCount = count;
  }

  onChangeColumn(colNums: number) {
    this.columnCountChange.emit(colNums);
  }
}
