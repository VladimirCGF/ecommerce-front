import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {State} from "../../../models/state.model";
import {MunicipalityService} from "../../../services/municipality.service";
import {StateService} from "../../../services/state.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Municipality} from "../../../models/municipality.model";
import {Client} from "../../../models/client.model";
import {AddressService} from "../../../services/address.service";
import {ClientService} from "../../../services/client.service";
import {state} from "@angular/animations";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent implements OnInit{

  addressForm!: FormGroup;
  states: State[] = [];
  municipalities: Municipality[] = [];
  client: Client[] = [];
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private stateService: StateService,
    private municipalityService: MunicipalityService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.addressForm = this.fb.group({
      id: [null],
      address: ['', Validators.required],
      idState: ['', Validators.required],
      idMunicipality: ['', Validators.required],
      cep: ['', Validators.required],
      idClient: ['', [Validators.required]]
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

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.addressService.getAddressById(this.id).subscribe(data => {
          this.addressForm.patchValue(data);
        });
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
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
    if (this.id) {
      this.updateAddress();
    } else {
      this.createAddress();
    }
  }

  private createAddress(): void {
    console.log('Criando novo endereço');
    if (this.addressForm.valid) {
      this.addressService.insertAddress(this.addressForm.value).subscribe(response => {
        console.log('Endereço criado com sucesso:', response);
        this.router.navigate(['/address']);
      }, error => {
        console.error('Erro ao criar endereço:', error);
      });
    } else {
      console.log('Formulário inválido:', this.addressForm.errors);
    }
  }

  private updateAddress(): void {
    console.log('Atualizando endereço');
    if (this.addressForm.valid && this.id) {
      this.addressService.updateAddress(this.id, this.addressForm.value).subscribe(response => {
        console.log('Endereço atualizado com sucesso:', response);
        this.router.navigate(['/address']);
      }, error => {
        console.error('Erro ao atualizar endereço:', error);
      });
    } else {
      console.log('Formulário inválido:', this.addressForm.errors);
    }
  }

  // checkCodeAvailability() {
  //   const id = this.municipalityForm.get('id')?.value;
  //   const name = this.municipalityForm.get('name')?.value;
  //   const idState = this.municipalityForm.get('idState')?.value;
  //
  //   if (name && idState) {
  //     this.municipalityService.validateName(id, name, idState).subscribe((isAvailable) => {
  //       const nameControl = this.municipalityForm.get('name');
  //       if (!isAvailable) {
  //         nameControl?.setErrors({codeTaken: true});
  //       } else {
  //         nameControl?.setErrors(null);
  //       }
  //     });
  //   }
  // }

}
