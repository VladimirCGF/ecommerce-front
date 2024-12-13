import {Component, OnInit} from '@angular/core';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../../services/address.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {Orders} from "../../../models/orders.model";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {map} from "rxjs";

@Component({
  selector: 'app-client-meus-pedidos',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    NgForOf,
    NgIf,
    DatePipe,
    JsonPipe,
    PercentPipe,
    DecimalPipe,
    CurrencyPipe
  ],
  templateUrl: './client-meus-pedidos.component.html',
  styleUrl: './client-meus-pedidos.component.css'
})
export class ClientMeusPedidosComponent implements OnInit {

  client: Client | undefined;
  orders: Orders[] = [];

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private addressService: AddressService,
              private localStorage: LocalStorageService,
              private dialog: MatDialog,
              private router: Router) {
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
          this.getOrders(token);
        }
      })
    }
  }

  getOrders(token: string) {
    this.clientService.getMyOrders(token).pipe(
      map(orders => {
        const filtered = orders.filter(order => order.status === 'Pago' || order.status === 'Cancelado' || order.status === 'Esperando Pagamento');
        return filtered;
      })
    ).subscribe(filteredOrder => {
      this.orders = filteredOrder;
    });
  }

}
