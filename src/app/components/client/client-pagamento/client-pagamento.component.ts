import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Payment} from "../../../models/payment.model";
import {Orders} from "../../../models/orders.model";
import {ClientService} from "../../../services/client.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {AddressService} from "../../../services/address.service";
import {Router, RouterLink} from "@angular/router";
import {WatchService} from "../../../services/watch.service";
import {OrderItemService} from "../../../services/order-item.service";
import {map} from "rxjs";
import {Client} from "../../../models/client.model";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-client-pagamento',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCardImage,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './client-pagamento.component.html',
  styleUrl: './client-pagamento.component.css'
})
export class ClientPagamentoComponent {

  paymentForm!: FormGroup;
  payment: Payment | undefined;
  client: Client | undefined;
  orders: Orders | undefined;


  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private localStorage: LocalStorageService,
              private addressService: AddressService,
              private router: Router,
              private watchService: WatchService,
              private orderItemService: OrderItemService,) {
  }

  ngOnInit(): void {
    this.getClient();
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      idOrders: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.paymentForm.value);

    if (this.paymentForm.invalid) {
      console.error("Formulário inválido:", this.paymentForm.errors);
      return;
    }
  }

  getClient() {
    const token = this.localStorage.getItem('jwt_token');
    if (token != null) {
      this.clientService.getClientByToken(token).subscribe({
        next: client => {
          this.client = client;
          this.getOrders();
          this.paymentForm = this.fb.group({
            paymentMethod: ['', Validators.required],
            idOrders: ['', Validators.required]
          });
        }
      });
    }
  }

  getOrders() {
    const token = this.localStorage.getItem('jwt_token');
    this.clientService.getMyOrders(token).pipe(
      map(orders => {
        return orders.find(order => order.status === 'Esperando Pagamento');
      })
    ).subscribe(pendingOrder => {
      if (pendingOrder) {
        this.orders = pendingOrder;
        this.paymentForm.patchValue({idOrders: pendingOrder.id});
      }
    });
  }

  save() {
    const token = this.localStorage.getItem('jwt_token');
    if (this.paymentForm.valid) {
      this.clientService.payment(token, this.paymentForm.value).subscribe(response => {
        console.log('Payment criado com sucesso:', response);
      }, error => {
        console.error('Erro ao criar payment:', error);
      });
    }
  }

}
