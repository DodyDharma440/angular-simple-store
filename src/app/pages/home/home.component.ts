import { Component, OnInit } from "@angular/core";

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

  columns = 1;
  rowHeight = rowHeights[this.columns];
  category = "";

  constructor() {}

  ngOnInit(): void {}

  onUpdateColumn(value: number) {
    this.columns = value;
    this.rowHeight = rowHeights[this.columns];
  }

  onUpdateCategory(value: string) {
    this.category = value;
  }
}
