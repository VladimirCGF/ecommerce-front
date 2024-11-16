import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StockService} from "../../../services/stock.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatFormFieldModule,
    MatToolbar,
    MatCard,
    MatCardContent,
    RouterLink,
  ],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})
export class StockFormComponent implements OnInit {

  stockForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log('ngOnInit chamado');

    this.stockForm = this.formBuilder.group({
      id: [this.id], // ID do cupom
      idWatch: ['', [Validators.required],],
      quantity: ['', [Validators.required,  Validators.min(1)]],
    });

    console.log('Formulário inicializado:', this.stockForm);

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      console.log('ID obtido:', this.id);
      if (this.id) {
        this.stockService.getStockById(this.id).subscribe(data => {
          this.stockForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.stockForm.value);

    if (this.stockForm.invalid) {
      console.error("Formulário inválido:", this.stockForm.errors);
      return;
    }
    if (this.id) {
      this.updateStock();
    } else {
      this.createStock();
    }
  }

  private createStock(): void {
    console.log('Criando novo stock');
    if (this.stockForm.valid) {
      this.stockService.insertStock(this.stockForm.value).subscribe(response => {
        console.log('Stock criado com sucesso:', response);
        this.router.navigate(['/stock']);
      }, error => {
        console.error('Erro ao criar stock:', error);
      });
    } else {
      console.log('Formulário inválido:', this.stockForm.errors);
    }
  }

  private updateStock(): void {
    console.log('Atualizando stock');
    if (this.stockForm.valid && this.id) {
      this.stockService.updateStock(this.id, this.stockForm.value).subscribe(response => {
        console.log('Stock atualizado com sucesso:', response);
        this.router.navigate(['/stock']);
      }, error => {
        console.error('Erro ao atualizar stock:', error);
      });
    } else {
      console.log('Formulário inválido:', this.stockForm.errors);
    }
  }

}
