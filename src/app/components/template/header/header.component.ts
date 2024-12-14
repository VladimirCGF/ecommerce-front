import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router,
              private authService: AuthService,) {
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateTo(route: string) {
    this.router.navigate(['']);
  }

  onExit() {
    const confirmation = confirm('Você tem certeza que deseja sair?');
    if (confirmation) {
      this.authService.removeUsuarioLogado();
    }
  }


}
