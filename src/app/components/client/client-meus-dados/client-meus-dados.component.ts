import {Component, OnInit} from '@angular/core';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../../services/local-storage.service";
import {MatButton} from "@angular/material/button";
import {MatCardImage} from "@angular/material/card";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {AddressService} from "../../../services/address.service";
import {Address} from "../../../models/address.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddressDialogComponent} from "../../address/address-dialog/address-dialog.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-client-meus-dados',
  standalone: true,
  imports: [
    MatButton,
    MatCardImage,
    CommonModule,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './client-meus-dados.component.html',
  styleUrl: './client-meus-dados.component.css'
})
export class ClientMeusDadosComponent implements OnInit {

  client: Client | undefined;
  trocarSenhaForm!: FormGroup;
  address: Address[] = [];
  buttonName: string = "Alterar senha";

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private addressService: AddressService,
              private localStorage: LocalStorageService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.trocarSenhaForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
    this.getClient();
  }

  getClient() {
    const token = this.localStorage.getItem('jwt_token');
    if (token != null) {
      this.clientService.getClientByToken(token).subscribe({
        next: client => {
          this.client = client;
          this.getAddress(client.id);
        }
      })
    }
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.trocarSenhaForm.value);

    if (this.trocarSenhaForm.invalid) {
      console.error("Formulário inválido:", this.trocarSenhaForm.errors);
      return;
    }
    this.trocarSenha();
  }

  trocarSenha(){
    const token = this.localStorage.getItem('jwt_token');
    if (this.trocarSenhaForm.valid) {
      this.clientService.trocarSenha(token, this.trocarSenhaForm.value).subscribe(response => {
        console.log('Senha trocada com sucesso:', response);
              }, error => {
        console.error('Erro ao trocar senha:', error);
      });
    } else {
      console.log('Formulário inválido:', this.trocarSenhaForm.errors);
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.address.push(result);
      }
    });
  }

  getAddress(id: number) {
    this.addressService.getMyListAddress(id).subscribe(data => {
      this.address = data;
    })
  }

  onDelete(id: number) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.clientService.removerAddress(token, id).subscribe(data => this.getClient());
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

}
