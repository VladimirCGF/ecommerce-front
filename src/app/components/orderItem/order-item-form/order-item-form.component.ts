import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CouponService} from "../../../services/coupon.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OrderItemService} from "../../../services/order-item.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-order-item-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './order-item-form.component.html',
  styleUrl: './order-item-form.component.css'
})
export class OrderItemFormComponent implements OnInit{

  orderItemForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private orderItemService: OrderItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.orderItemForm = this.fb.group({
      id: [null],
      idOrders: ['', Validators.required],
      idWatch: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.orderItemService.getOrderItemById(this.id).subscribe(data => {
          this.orderItemForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.orderItemForm.value);

    if (this.orderItemForm.invalid) {
      console.error("Formulário inválido:", this.orderItemForm.errors);
      return;
    }
    if (this.id) {
      this.updateOrderItem();
    } else {
      this.createOrderItem();
    }
  }

  private createOrderItem(): void {
    console.log('Criando novo OrderItem');
    if (this.orderItemForm.valid) {
      this.orderItemService.insertOrderItem(this.orderItemForm.value).subscribe(response => {
        console.log('OrderItem criado com sucesso:', response);
        this.router.navigate(['/orderItem']);
      }, error => {
        console.error('Erro ao criar OrderItem:', error);
      });
    } else {
      console.log('Formulário inválido:', this.orderItemForm.errors);
    }
  }

  private updateOrderItem(): void {
    console.log('Atualizando orderItem');
    if (this.orderItemForm.valid && this.id) {
      this.orderItemService.updateOrderItem(this.id, this.orderItemForm.value).subscribe(response => {
        console.log('OrderItem atualizado com sucesso:', response);
        this.router.navigate(['/orderItem']);
      }, error => {
        console.error('Erro ao atualizar orderItem:', error);
      });
    } else {
      console.log('Formulário inválido:', this.orderItemForm.errors);
    }
  }

}
