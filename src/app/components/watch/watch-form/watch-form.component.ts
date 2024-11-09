import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WatchService} from "../../../services/watch.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StockService} from "../../../services/stock.service";
import {StateService} from "../../../services/state.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-watch-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './watch-form.component.html',
  styleUrl: './watch-form.component.css'
})
export class WatchFormComponent implements OnInit{

  watchForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private watchService: WatchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.watchForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      description:['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      material: ['', [Validators.required]],
      color: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      format: ['', [Validators.required]],
      mechanism: ['', [Validators.required],]
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.watchService.getWatchById(this.id).subscribe(data => {
          this.watchForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.watchForm.value);

    if (this.watchForm.invalid) {
      console.error("Formulário inválido:", this.watchForm.errors);
      return;
    }
    if (this.id) {
      this.updateWatch();
    } else {
      this.createWatch();
    }
  }

  private createWatch(): void {
    console.log('Criando novo relógio');
    if (this.watchForm.valid) {
      this.watchService.insertWatch(this.watchForm.value).subscribe(response => {
        console.log('Relógio criado com sucesso:', response);
        this.router.navigate(['/watches']);
      }, error => {
        console.error('Erro ao criar relógio:', error);
      });
    } else {
      console.log('Formulário inválido:', this.watchForm.errors);
    }
  }

  private updateWatch(): void {
    console.log('Atualizando relógio');
    if (this.watchForm.valid && this.id) {
      this.watchService.updateWatch(this.id, this.watchForm.value).subscribe(response => {
        console.log('Relógio atualizado com sucesso:', response);
        this.router.navigate(['/watches']);
      }, error => {
        console.error('Erro ao atualizar relógio:', error);
      });
    } else {
      console.log('Formulário inválido:', this.watchForm.errors);
    }
  }

}
