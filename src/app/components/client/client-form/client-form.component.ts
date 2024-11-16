import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {

  clientForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.clientForm = this.fb.group({
      id: [null],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.clientService.getClientById(this.id).subscribe(data => {
          this.clientForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.clientForm.value);

    if (this.clientForm.invalid) {
      console.error("Formulário inválido:", this.clientForm.errors);
      return;
    }
    if (this.id) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  private createClient(): void {
    console.log('Criando novo cliente');
    if (this.clientForm.valid) {
      this.clientService.insertClient(this.clientForm.value).subscribe(response => {
        console.log('Cliente criado com sucesso:', response);
        this.router.navigate(['/client']);
      }, error => {
        console.error('Erro ao criar cliente:', error);
      });
    } else {
      console.log('Formulário inválido:', this.clientForm.errors);
    }
  }

  private updateClient(): void {
    console.log('Atualizando cliente');
    if (this.clientForm.valid && this.id) {
      this.clientService.updateClient(this.id, this.clientForm.value).subscribe(response => {
        console.log('Cliente atualizado com sucesso:', response);
        this.router.navigate(['/client']);
      }, error => {
        console.error('Erro ao atualizar cliente:', error);
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
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

}
