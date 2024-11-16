import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CouponService} from '../../../services/coupon.service';
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-coupon-form',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit {

  couponForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.couponForm = this.fb.group({
      id: [null],
      code: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.min(1)]],
      validUntil: ['', [Validators.required]]
    });


    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.couponService.getCouponById(this.id).subscribe(data => {
          this.couponForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.couponForm.value);

    if (this.couponForm.invalid) {
      console.error("Formulário inválido:", this.couponForm.errors);
      return;
    }
    if (this.id) {
      this.updateCoupon();
    } else {
      this.createCoupon();
    }
  }

  private createCoupon(): void {
    console.log('Criando novo cupom');
    if (this.couponForm.valid) {
      this.couponService.insertCoupon(this.couponForm.value).subscribe(response => {
        console.log('Cupom criado com sucesso:', response);
        this.router.navigate(['/coupon']);
      }, error => {
        console.error('Erro ao criar cupom:', error);
      });
    } else {
      console.log('Formulário inválido:', this.couponForm.errors);
    }
  }

  private updateCoupon(): void {
    console.log('Atualizando cupom');
    if (this.couponForm.valid && this.id) {
      this.couponService.updateCoupon(this.id, this.couponForm.value).subscribe(response => {
        console.log('Cupom atualizado com sucesso:', response);
        this.router.navigate(['/coupon']);
      }, error => {
        console.error('Erro ao atualizar cupom:', error);
      });
    } else {
      console.log('Formulário inválido:', this.couponForm.errors);
    }
  }

  checkCodeAvailability() {
    const id = this.couponForm.get('id')?.value;
    const code = this.couponForm.get('code')?.value;

    if (code) {
      this.couponService.validateCode(id, code).subscribe((isAvailable) => {
        const codeControl = this.couponForm.get('code');
        if (!isAvailable) {
          codeControl?.setErrors({codeTaken: true});
        } else {
          codeControl?.setErrors(null); // Remove o erro se o código estiver disponível
        }
      });
    }
  }


}
