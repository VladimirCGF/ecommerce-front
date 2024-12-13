import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {NgForOf, NgIf} from "@angular/common";
import {Watch} from "../../../models/watch.model";
import {WatchService} from "../../../services/watch.service";

@Component({
  selector: 'app-storage-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './storage-form.component.html',
  styleUrls: ['./storage-form.component.css']
})
export class StorageFormComponent implements OnInit {

  storageForm!: FormGroup;
  buttonName: string = "Cadastrar";
  private id: string | null | undefined;
  watches: Watch[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private watchService: WatchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.storageForm = this.fb.group({
      id: [null],
      idWatch: ['', Validators.required],
      name: ['', [Validators.required]],
      url: ['']
    });

    this.watchService.getWatches().subscribe(watches => {
      this.watches = watches;
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      if (this.id) {
        this.storageService.getStorageById(this.id).subscribe(data => {
          this.storageForm.patchValue(data);
        })
        this.buttonName = "Editar";
      } else {
        this.buttonName = "Cadastrar";
      }
    });
  }

  onSubmit() {
    console.log("Submetendo formulário...");
    console.log("Formulário atual:", this.storageForm.value);
    if (this.storageForm.invalid) {
      console.error("Formulário inválido:", this.storageForm.errors);
      return;
    }
    this.createStorage();
  }

  private createStorage(): void {
    console.log('Criando novo Armazenamento');
    if (this.selectedFile && this.storageForm.valid) {
      const idWatch = this.storageForm.value.idWatch;
      const name = this.storageForm.value.name;
      console.log('Dados enviados:', idWatch, name, this.selectedFile);
      this.storageService.insertStorage(idWatch, name, this.selectedFile)
        .subscribe({
          next: (response) => {
            console.log('Upload successful:', response);
            this.router.navigate(['/admin/storage']);
          },
          error: (error) => {
            console.error('Upload failed:', error);
          }
        });
    } else {
      console.error('No file selected or Form is invalid.');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}
