import { Component, signal } from '@angular/core';
import { Watch } from "../../../models/watch.model";
import { WatchService } from "../../../services/watch.service";
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import {NgForOf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

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
    SlicePipe
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
}
