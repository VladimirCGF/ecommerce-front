import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SidebarService} from "../../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatDrawer,
    MatToolbar,
    MatNavList,
    MatListItem,
    RouterOutlet,
    RouterLink,
    MatDrawer,
    MatDrawerContent,
    MatDrawerContainer
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
    this.sideBarService.sideNavToggleSubject.subscribe(
      () => {
        this.drawer.toggle();
      }
    )
  }

}
