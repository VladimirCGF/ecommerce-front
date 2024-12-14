import {Component, OnInit, signal} from '@angular/core';
import {Watch} from "../../../models/watch.model";
import {WatchService} from "../../../services/watch.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../models/client.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "../../../services/local-storage.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {HeaderComponent} from "../../template/header/header.component";
import {FooterComponent} from "../../template/footer/footer.component";
import {MatToolbar} from "@angular/material/toolbar";


type Card = {
  idWatch: string;
  nameImage: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-watch-card-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardFooter,
    MatButton,
    NgForOf,
    RouterLink,
    SlicePipe,
    NgIf,
    MatFormField,
    MatIconButton,
    MatInput,
    MatIcon,
    MatLabel,

  ],
  templateUrl: './watch-card-list.component.html',
  styleUrls: ['./watch-card-list.component.css']
})
export class WatchCardListComponent implements OnInit{
  watches: Watch[] = [];
  client: Client | undefined;
  cards = signal<Card[]>([]);
  addItemForm!: FormGroup;
  searchTerm: string = '';

  constructor(private fb: FormBuilder,
              private localStorage: LocalStorageService,
              private clientService: ClientService,
              private watchService: WatchService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.searchWatchesByName(this.searchTerm);
      } else {
        this.loadWatches();
      }
    });

    this.addItemForm = this.fb.group({
      idWatch: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }


  loadWatches() {
    this.watchService.getWatches().subscribe(data => {
      this.watches = data;
      this.loadCards();
    });
  }

  loadCards() {
    const cards = this.watches
      .filter(watch => watch.imagePerfil)
      .map(watch => ({
        idWatch: watch.id,
        nameImage: watch.imagePerfil.name,
        name: watch.name,
        price: watch.price
      }));
    this.cards.set(cards);
  }

  save(card: any) {
    const token = this.localStorage.getItem('jwt_token');
    const addItemPayload = {
      idWatch: card.idWatch,
      quantity: 1
    };

    this.clientService.addItem(token, addItemPayload).subscribe({
      next: () => {
        console.log('Item adicionado ao carrinho com sucesso');
      },
      error: (error) => {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    });
  }

  searchWatchesByName(searchTerm: string) {
    this.watchService.getWatchesByName(searchTerm).subscribe(data => {
      this.watches = data;
      this.loadCards();
    });
  }

  onSearch(searchTerm: string) {
    if (searchTerm.trim()) {
      this.watchService.getWatchesByName(searchTerm).subscribe({
        next: result => {
          this.watches = result;
        }
      })
      this.router.navigate(['/ecommerce'], {
        queryParams: {
          search: searchTerm.trim()
        }
      });
      console.log('Termo de busca:', searchTerm);
    }
  }


}
