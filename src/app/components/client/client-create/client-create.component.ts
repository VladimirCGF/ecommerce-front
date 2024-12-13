import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent implements OnInit {

  clientForm!: FormGroup;
  buttonName: string = "Cadastrar";

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      id: [null],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required]],
    }, {validator: this.passwordMatchValidator});
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.clientForm.value);

    if (this.clientForm.invalid) {
      console.error("Formulário inválido:", this.clientForm.errors);
      return;
    }
    this.createClient();
  }

  private createClient(): void {
    console.log('Criando novo cliente');
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe(response => {
        console.log('Cliente criado com sucesso:', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Erro ao criar cliente:', error);
      });
    } else {
      console.log('Formulário inválido:', this.clientForm.errors);
    }
  }

  checkEmailAvailability() {
    const id = this.clientForm.get('id')?.value;
    const email = this.clientForm.get('email')?.value;
    if (email) {
      this.clientService.validateEmail(id, email).subscribe((isAvailable) => {
        const emailControl = this.clientForm.get('email');
        if (!isAvailable) {
          emailControl?.setErrors({codeTaken: true});
        } else {
          emailControl?.setErrors(null);
        }
      });
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }
}
