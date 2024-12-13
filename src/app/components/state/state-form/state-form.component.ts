import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StateService} from "../../../services/state.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-state-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.css'
})
export class StateFormComponent implements OnInit {

  stateForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.stateForm = this.fb.group({
      id: [null],
      abbreviations: ['', Validators.required],
      name: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.stateService.getStateById(this.id).subscribe(data => {
          this.stateForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.stateForm.value);

    if (this.stateForm.invalid) {
      console.error("Formulário inválido:", this.stateForm.errors);
      return;
    }
    if (this.id) {
      this.updateState();
    } else {
      this.createState();
    }
  }

  private createState(): void {
    console.log('Criando novo cupom');
    if (this.stateForm.valid) {
      this.stateService.insertState(this.stateForm.value).subscribe(response => {
        console.log('Estado criado com sucesso:', response);
        this.router.navigate(['/admin/states']);
      }, error => {
        console.error('Erro ao criar estado:', error);
        alert('Este código já existe')
      });
    } else {
      console.log('Formulário inválido:', this.stateForm.errors);
    }
  }

  private updateState(): void {
    console.log('Atualizando estado');
    if (this.stateForm.valid && this.id) {
      this.stateService.updateState(this.id, this.stateForm.value).subscribe(response => {
        console.log('Estado atualizado com sucesso:', response);
        this.router.navigate(['/admin/states']);
      }, error => {
        console.error('Erro ao atualizar estado:', error);
      });
    } else {
      console.log('Formulário inválido:', this.stateForm.errors);
    }
  }

  checkCodeAvailabilityAbbreviations() {
    const id = this.stateForm.get('id')?.value;
    const abbreviations = this.stateForm.get('abbreviations')?.value;

    if (abbreviations) {
      this.stateService.validateAbbreviations(id, abbreviations).subscribe((isAvailable) => {
        const abbreviationsControl = this.stateForm.get('abbreviations');
        if (!isAvailable) {
          abbreviationsControl?.setErrors({codeTaken: true});
        } else {
          abbreviationsControl?.setErrors(null);
        }
      });
    }
  }

  checkCodeAvailabilityName() {
    const id = this.stateForm.get('id')?.value;
    const name = this.stateForm.get('name')?.value;

    if (name) {
      this.stateService.validateName(id, name).subscribe((isAvailable) => {
        const nameControl = this.stateForm.get('name');
        if (!isAvailable) {
          nameControl?.setErrors({codeTaken: true});
        } else {
          nameControl?.setErrors(null);
        }
      });
    }
  }
}
