import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="container max-w-7xl mx-auto">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "simple-store";
}
