import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../template/footer/footer.component";
import {SidebarComponent} from "../template/sidebar/sidebar.component";
import {HeaderComponent} from "../template/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButton, RouterLink, FooterComponent, SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
