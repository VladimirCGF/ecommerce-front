import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";
import {NgIf} from "@angular/common";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent  implements OnInit{
  employeeForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.employeeForm = this.fb.group({
      id: [null],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.employeeService.getEmployeeById(token, this.id).subscribe(data => {
          this.employeeForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.employeeForm.value);

    if (this.employeeForm.invalid) {
      console.error("Formulário inválido:", this.employeeForm.errors);
      return;
    }
    if (this.id) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  private createEmployee(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Criando novo funcionário');
    if (this.employeeForm.valid) {
      this.employeeService.insertEmployee(token, this.employeeForm.value).subscribe(response => {
        console.log('Cliente criado com sucesso:', response);
        this.router.navigate(['/admin/employee']);
      }, error => {
        console.error('Erro ao criar funcionário:', error);
      });
    } else {
      console.log('Formulário inválido:', this.employeeForm.errors);
    }
  }

  private updateEmployee(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Atualizando funcionário');
    if (this.employeeForm.valid && this.id) {
      this.employeeService.updateEmployee(token, this.id, this.employeeForm.value).subscribe(response => {
        console.log('Funcionário atualizado com sucesso:', response);
        this.router.navigate(['/admin/employee']);
      }, error => {
        console.error('Erro ao atualizar funcionário:', error);
      });
    } else {
      console.log('Formulário inválido:', this.employeeForm.errors);
    }
  }

  checkEmailAvailability() {
    const id = this.employeeForm.get('id')?.value;
    const email = this.employeeForm.get('email')?.value;

    if (email) {
      this.employeeService.validateEmail(id, email).subscribe((isAvailable) => {
        const emailControl = this.employeeForm.get('email');
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
