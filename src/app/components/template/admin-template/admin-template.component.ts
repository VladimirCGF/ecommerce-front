import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterAdminComponent} from "../footer-admin/footer-admin.component";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    FooterAdminComponent
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
