import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WatchService} from '../../../services/watch.service';
import {Watch} from '../../../models/watch.model';
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-watch-card',
  standalone: true,
  templateUrl: './watch-card.component.html',
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    CommonModule, MatCardModule, MatButtonModule, MatIcon,
  ],
  styleUrls: ['./watch-card.component.css']
})
export class WatchCardComponent implements OnInit {

  watch: Watch | null = null;
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private watchService: WatchService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.watchService.getWatchById(id).subscribe(data => {
        this.watch = data;
        console.log(this.watch.imageUrls);
      });
    }
  }

  uploadImage(file: File): void {
    // Obtenha o nome do arquivo selecionado diretamente
    const fileName = file.name;

    if (this.watch?.id) {
      // Passando o arquivo diretamente para o serviço, sem precisar criar a URL manualmente
      this.watchService.uploadImage(this.watch.id.toString(), file).subscribe(
        (response) => {
          if (response && response.fileName) {
            // Construir a URL da imagem usando a resposta do servidor
            const uploadedImageUrl = 'http://localhost:8080/api/watches/image/${response.fileName}';

            // Usando o operador de afiliação opcional para adicionar a URL no array de imagens
            this.watch?.imageUrls?.push(uploadedImageUrl);
            console.log('Imagem enviada com sucesso!', response);
          }
        },
        (error) => {
          console.error('Erro ao enviar a imagem', error);
        }
      );
    } else {
      console.error('Watch ou id não encontrados');
    }
  }

// Método que é chamado quando um arquivo é selecionado
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name); // Aqui você pega o nome da imagem
      this.uploadImage(file); // Envia o arquivo para upload
    }
  }

  // Função para ir para a imagem anterior
  previousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Função para ir para a próxima imagem
  nextImage(): void {
    if (this.watch && this.currentIndex < this.watch.imageUrls.length - 1) {
      this.currentIndex++;
    }
  }
}
