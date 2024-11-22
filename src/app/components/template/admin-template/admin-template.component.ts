import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
