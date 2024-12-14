import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {WatchCardListComponent} from "../../watch/watch-card-list/watch-card-list.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {WatchService} from "../../../services/watch.service";
import {Watch} from "../../../models/watch.model";
import {AuthService} from "../../../services/auth.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    WatchCardListComponent,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatToolbar,
    RouterLink,
  ],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent implements OnInit {

  watches: Watch[] = [];

  constructor(private router: Router,
              private watchService: WatchService,
              private authService: AuthService,
              private localStorage: LocalStorageService) {
  }


  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['/ecommerce']);
  }

  // onSearch(searchTerm: string) {
  //   if (searchTerm.trim()) {
  //     this.watchService.getWatchesByName(searchTerm).subscribe({
  //       next: result => {
  //         this.watches = result;
  //       }
  //     })
  //     this.router.navigate(['/ecommerce'], {
  //       queryParams: {
  //         search: searchTerm.trim()
  //       }
  //     });
  //     console.log('Termo de busca:', searchTerm);
  //   }
  // }

  // navigateTo(route: string) {
  //   // this.router.navigate(['']);
  // }

  onExit() {
    const confirmation = confirm('Você tem certeza que deseja sair?');
    if (confirmation) {
      this.authService.removeUsuarioLogado();
    }
  }

  login() {
    const token = this.localStorage.getItem('jwt_token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/minha-conta']);
    }
  }

}
