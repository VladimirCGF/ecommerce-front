import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MunicipalityService} from "../../../services/municipality.service";
import {State} from "../../../models/state.model";
import {StateService} from "../../../services/state.service";
import {CommonModule, NgIf} from '@angular/common';
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-municipality-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './municipality-form.component.html',
  styleUrl: './municipality-form.component.css'
})
export class MunicipalityFormComponent implements OnInit {

  municipalityForm!: FormGroup;
  states: State[] = [];
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private municipalityService: MunicipalityService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.municipalityForm = this.fb.group({
      id: [null],
      idState: ['', Validators.required],
      name: ['', [Validators.required]]
    });

    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.municipalityService.getMunicipalityById(token, this.id).subscribe(data => {
          this.municipalityForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }


  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.municipalityForm.value);
    if (this.municipalityForm.invalid) {
      console.error("Formulário inválido:", this.municipalityForm.errors);
      return;
    }
    if (this.id) {
      this.updateMunicipality();
    } else {
      this.createMunicipality();
    }
  }

  private createMunicipality(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Criando novo município');
    if (this.municipalityForm.valid) {
      this.municipalityService.insertMunicipality(token, this.municipalityForm.value).subscribe(response => {
        console.log('Município criado com sucesso:', response);
        this.router.navigate(['/admin/municipality']);
      }, error => {
        console.error('Erro ao criar município:', error);
      });
    } else {
      console.log('Formulário inválido:', this.municipalityForm.errors);
    }
  }

  private updateMunicipality(): void {
    const token = this.localStorage.getItem('jwt_token');
    console.log('Atualizando município');
    if (this.municipalityForm.valid && this.id) {
      this.municipalityService.updateMunicipality(token, this.id, this.municipalityForm.value).subscribe(response => {
        console.log('Município atualizado com sucesso:', response);
        this.router.navigate(['/admin/municipality']);
      }, error => {
        console.error('Erro ao atualizar município:', error);
      });
    } else {
      console.log('Formulário inválido:', this.municipalityForm.errors);
    }
  }

  checkCodeAvailability() {
    const id = this.municipalityForm.get('id')?.value;
    const name = this.municipalityForm.get('name')?.value;
    const idState = this.municipalityForm.get('idState')?.value;

    if (name && idState) {
      this.municipalityService.validateName(id, name, idState).subscribe((isAvailable) => {
        const nameControl = this.municipalityForm.get('name');
        if (!isAvailable) {
          nameControl?.setErrors({codeTaken: true});
        } else {
          nameControl?.setErrors(null);
        }
      });
    }
  }

}
