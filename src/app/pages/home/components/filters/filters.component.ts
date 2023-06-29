import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  @Output() showCategories = new EventEmitter<string>();

  categories = ["shoes", "sports"];

  constructor() {}

  ngOnInit(): void {}

  onShowCategory(category: string) {
    this.showCategories.emit(category);
  }
}
