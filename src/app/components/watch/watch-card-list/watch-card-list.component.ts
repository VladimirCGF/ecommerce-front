import { Component, signal } from '@angular/core';
import { Watch } from "../../../models/watch.model";
import { WatchService } from "../../../services/watch.service";
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { NgForOf } from "@angular/common";

type Card = {
  name: string;
  price: number;
  imagePerfil: string;
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
    NgForOf
  ],
  templateUrl: './watch-card-list.component.html',
  styleUrls: ['./watch-card-list.component.css']
})
export class WatchCardListComponent {
  watches: Watch[] = [];
  cards = signal<Card[]>([]);

  constructor(private watchService: WatchService) { }

  ngOnInit(): void {
    this.loadWatches();
  }

  loadWatches() {
    this.watchService.getWatches().subscribe(data => {
      this.watches = data;
      this.loadCards();
    });
  }

  loadCards() {
    const cards: Card[] = [];
    this.watches.forEach(watch => {
      cards.push({
        name: watch.name,
        price: watch.price,
        imagePerfil: this.watchService.getImagePerfil(watch.id)
      });
    });
    this.cards.set(cards);
  }
}
