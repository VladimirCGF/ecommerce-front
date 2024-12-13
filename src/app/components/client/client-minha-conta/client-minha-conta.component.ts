import {Component, OnInit} from '@angular/core';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {RouterLink} from "@angular/router";
import {LocalStorageService} from "../../../services/local-storage.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-client-minha-conta',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    NgForOf,
    NgIf,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './client-minha-conta.component.html',
  styleUrl: './client-minha-conta.component.css'
})
export class ClientMinhaContaComponent implements OnInit {

  client: Client | undefined;

  constructor(private clientService: ClientService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    const token = this.localStorage.getItem('jwt_token');
    if (token != null) {
      this.clientService.getClientByToken(token).subscribe({
        next: client => {
          this.client = client;
        }
      })
    }
  }

}
