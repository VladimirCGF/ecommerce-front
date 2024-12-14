import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StateService} from "../../../services/state.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PaymentService} from "../../../services/payment.service";
import {NgIf} from "@angular/common";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit{

  paymentForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.paymentForm = this.fb.group({
      id: [null],
      paymentMethod: ['', Validators.required],
      idOrders: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.paymentService.getPaymentById(token, this.id).subscribe(data => {
          this.paymentForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.paymentForm.value);

    if (this.paymentForm.invalid) {
      console.error("Formulário inválido:", this.paymentForm.errors);
      return;
    }
    if (this.id) {
      this.updatePayment();
    } else {
      this.createPayment();
    }
  }

  private createPayment(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Criando novo pagamento');
    if (this.paymentForm.valid) {
      this.paymentService.insertPayment(token, this.paymentForm.value).subscribe(response => {
        console.log('Estado criado com sucesso:', response);
        this.router.navigate(['/admin/payment']);
      }, error => {
        console.error('Erro ao criar pagamento:', error);
      });
    } else {
      console.log('Formulário inválido:', this.paymentForm.errors);
    }
  }

  private updatePayment(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Atualizando pagamento');
    if (this.paymentForm.valid && this.id) {
      this.paymentService.updatePayment(token, this.id, this.paymentForm.value).subscribe(response => {
        console.log('Estado atualizado com sucesso:', response);
        this.router.navigate(['/admin/payment']);
      }, error => {
        console.error('Erro ao atualizar pagamento:', error);
      });
    } else {
      console.log('Formulário inválido:', this.paymentForm.errors);
    }
  }

}
