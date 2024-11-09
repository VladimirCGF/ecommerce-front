import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StateListComponent} from "./components/state/state-list/state-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StateListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce-FronEnd';
}
