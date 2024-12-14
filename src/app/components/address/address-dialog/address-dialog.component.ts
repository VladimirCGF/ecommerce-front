import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AddressService} from "../../../services/address.service";
import {NgForOf, NgIf} from "@angular/common";
import {State} from "../../../models/state.model";
import {Municipality} from "../../../models/municipality.model";
import {StateService} from "../../../services/state.service";
import {MunicipalityService} from "../../../services/municipality.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../models/client.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
    MatInput,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    NgForOf,
    MatSelect,
    MatOption,
    NgIf,
    RouterLink
  ],
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.css'
})
export class AddressDialogComponent implements OnInit {

  addressForm!: FormGroup;
  states: State[] = [];
  municipalities: Municipality[] = [];
  buttonName: string = "Salvar";
  client: Client | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    private addressService: AddressService,
    private stateService: StateService,
    private clientService: ClientService,
    private municipalityService: MunicipalityService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.getClient();
    this.addressForm = this.fb.group({
      id: [null],
      address: ['', Validators.required],
      idState: ['', Validators.required],
      idMunicipality: ['', Validators.required],
      cep: ['', Validators.required],
      client: [this.client]
    });

    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });

    this.addressForm.get('idState')?.valueChanges.subscribe(idState => {
      if (idState) {
        this.municipalityService.getMunicipalityByIdState(idState).subscribe(municipalities => {
          this.municipalities = municipalities;
        });
      } else {
        this.municipalities = [];
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.addressForm.value);

    if (this.addressForm.invalid) {
      console.error("Formulário inválido:", this.addressForm.errors);
      return;
    }
  }

  save() {
    if (this.addressForm.valid) {
      const token = this.localStorage.getItem('jwt_token');
      console.log(token)
      this.clientService.addAddress(token, this.addressForm.value).subscribe(response => {
        console.log('Endereço criado com sucesso:', response);
      }, error => {
        console.error('Erro ao criar endereço:', error);
      });
      this.dialogRef.close(this.addressForm.value);
    }
  }

  getClient() {
    const token = this.localStorage.getItem('jwt_token');
    if (token != null) {
      this.clientService.getClientByToken(token).subscribe({
        next: client => {
          this.client = client;
          this.addressForm.patchValue({ client: this.client });
        },
        error: err => {
          console.error('Erro ao recuperar cliente:', err);
        }
      });
    }
  }


}
