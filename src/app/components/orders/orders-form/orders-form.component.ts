import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CouponService} from "../../../services/coupon.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OrdersService} from "../../../services/orders.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-orders-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.css'
})
export class OrdersFormComponent implements OnInit{

  ordersForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.ordersForm = this.fb.group({
      id: [null],
      idClient: ['', [Validators.required,]],
      idAddress: ['', [Validators.required,]],
      coupon: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.ordersService.getOrdersById(this.id).subscribe(data => {
          this.ordersForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.ordersForm.value);

    if (this.ordersForm.invalid) {
      console.error("Formulário inválido:", this.ordersForm.errors);
      return;
    }
    if (this.id) {
      this.updateCoupon();
    } else {
      this.createCoupon();
    }
  }

  private createCoupon(): void {
    console.log('Criando novo orders');
    if (this.ordersForm.valid) {
      this.ordersService.insertOrders(this.ordersForm.value).subscribe(response => {
        console.log('Orders criado com sucesso:', response);
        this.router.navigate(['/orders']);
      }, error => {
        console.error('Erro ao criar orders:', error);
      });
    } else {
      console.log('Formulário inválido:', this.ordersForm.errors);
    }
  }

  private updateCoupon(): void {
    console.log('Atualizando orders');
    if (this.ordersForm.valid && this.id) {
      this.ordersService.updateOrders(this.id, this.ordersForm.value).subscribe(response => {
        console.log('Orders atualizado com sucesso:', response);
        this.router.navigate(['/orders']);
      }, error => {
        console.error('Erro ao atualizar orders:', error);
      });
    } else {
      console.log('Formulário inválido:', this.ordersForm.errors);
    }
  }

}
