import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() itemsCountChange = new EventEmitter<string>();

  sort = "desc";
  itemsCount = "12";

  constructor() {}

  ngOnInit(): void {}

  onChangeSort(value: string) {
    this.sortChange.emit(value);
    this.sort = value;
  }

  onChangeItems(count: number) {
    this.itemsCountChange.emit(count.toString());
    this.itemsCount = count.toString();
  }

  onChangeColumn(colNums: number) {
    this.columnCountChange.emit(colNums);
  }
}
