import {Component, OnInit, signal} from '@angular/core';
import {Client} from "../../../models/client.model";
import {Orders} from "../../../models/orders.model";
import {ClientService} from "../../../services/client.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {map} from "rxjs";
import {MatCardImage} from "@angular/material/card";
import {AddressService} from "../../../services/address.service";
import {Address} from "../../../models/address.model";
import {OrderItem} from "../../../models/order-item.model";
import {Watch} from "../../../models/watch.model";
import {WatchService} from "../../../services/watch.service";
import {OrderItemService} from "../../../services/order-item.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

type Card = {
  idOrderItem: number;
  idWatch: string;
  nameImage: string;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-client-carrinho',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    MatCardImage,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './client-carrinho.component.html',
  styleUrl: './client-carrinho.component.css'
})
export class ClientCarrinhoComponent implements OnInit {

  client: Client | undefined;
  checkoutForm!: FormGroup;
  orders: Orders | undefined;
  orderItem: OrderItem | undefined;
  orderItems: OrderItem[] = [];
  address: Address[] = [];
  watches: Watch[] = [];
  cards = signal<Card[]>([]);

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
    this.getAddress();
    this.checkoutForm = this.fb.group({
      idClient: [this.client?.id, Validators.required],
      idAddress: ['', Validators.required],
      quantity:['', Validators.min(1)],
      coupon: [null,]
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.checkoutForm.value);

    if (this.checkoutForm.invalid) {
      console.error("Formulário inválido:", this.checkoutForm.errors);
      return;
    }
  }

  getClient() {
    const token = this.localStorage.getItem('jwt_token');
    if (token != null) {
      this.clientService.getClientByToken(token).subscribe({
        next: client => {
          this.client = client;
          this.checkoutForm = this.fb.group({
            client: [this.client?.id, Validators.required],
            idAddress: ['', Validators.required],
            quantity:['', Validators.min(1)],
            coupon: [null]
          });
          this.checkoutForm.patchValue({client: client.id});
          this.getOrders(token);
        }
      });
    }
  }

  getOrders(token: string) {
    this.clientService.getMyOrders(token).pipe(
      map(orders => {
        return orders.find(order => order.status === 'Pendente');
      })
    ).subscribe(pendingOrder => {
      if (pendingOrder) {
        this.orders = pendingOrder;
        this.orderItems = pendingOrder.orderItems || [];
        this.watchService.getWatchesByIdOrder(pendingOrder.id).subscribe(watches => {
          this.watches = watches;
          this.loadCards();

        });
      } else {
        this.orderItems = [];
        this.watches = [];
      }
    });
  }

  loadCards() {
    const cards = this.orderItems
      .filter(watch => watch.idWatch?.imagePerfil) // Safely check existence
      .map(watch => ({
        idOrderItem: watch.id,
        idWatch: watch.idWatch?.id,
        nameImage: watch.idWatch?.imagePerfil?.name,
        name: watch.idWatch?.name,
        price: watch.idWatch?.price,
        quantity: watch.quantity
      }));
    this.cards.set(cards);
  }


  getAddress() {
    const token = this.localStorage.getItem('jwt_token');
    this.clientService.getMyAddress(token).subscribe(data => {
      this.address = data;
    });
  }

  save() {
    const token = this.localStorage.getItem('jwt_token');
    if (this.checkoutForm.valid) {
      const token = this.localStorage.getItem('jwt_token');
      this.clientService.checkout(token, this.checkoutForm.value).subscribe(response => {
        console.log('Checkout criado com sucesso:', response);
      }, error => {
        console.error('Erro ao criar checkout:', error);
      });
    }
  }

  onDelete(id: number) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.clientService.removeItem(token, id).subscribe(data => this.getClient());
    }
  }

  increaseQuantity(id: number): void {
    const card = this.cards().find(c => c.idOrderItem === id);
    if (card) {
      this.orderItemService.addQuantity(id, 1).subscribe({
        next: () => {
          card.quantity += 1;
          location.reload();
        },
        error: (err) => {
          console.error('Erro ao adicionar quantidade:', err);
        },
      });
    }
  }


  decreaseQuantity(id: number): void {
    const card = this.cards().find(c => c.idOrderItem === id);
    if (card) {
      if (card.quantity > 1) {
        this.orderItemService.removeQuantity(id, 1).subscribe({
          next: () => {
            card.quantity -= 1;
            location.reload();
          },
          error: (err) => {
            console.error('Erro ao reduzir quantidade:', err);
          },
        });
      } else {
        this.onDelete(id);
      }
    }
  }



}
