import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatDrawerContent} from "@angular/material/sidenav";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-footer-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDrawerContent,
    SidebarComponent
  ],
  templateUrl: './footer-admin.component.html',
  styleUrl: './footer-admin.component.css'
})
export class FooterAdminComponent {

}
