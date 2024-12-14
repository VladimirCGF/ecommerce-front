import {Component, OnInit} from '@angular/core';
import {WatchService} from "../../../services/watch.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Watch} from "../../../models/watch.model";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {StorageService} from "../../../services/storage.service";
import {Storage} from "../../../models/storage.model";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTableDataSource} from "@angular/material/table";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-watch-view',
  standalone: true,
  templateUrl: './watch-view.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    NgIf,
    MatCardImage,
    NgForOf,
    MatButton,
    MatFormField,
    MatInput,
    RouterLink
  ],
  styleUrls: ['./watch-view.component.css']
})
export class WatchViewComponent implements OnInit {

  id: string | null | undefined;
  watch: Watch | undefined;
  watches: Watch[] = [];
  storages: Storage[] | undefined;
  selectedImage: string | undefined;

  dataSource = new MatTableDataSource<Watch>(this.watches);

  constructor(
    private watchService: WatchService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.getWatchById();
    this.getStorageAllByWatchId();
  }

  getWatchById() {
    const token = this.localStorage.getItem('jwt_token');
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.watchService.getWatchById(this.id).subscribe({
      next: (data) => {
        this.watch = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getStorageAllByWatchId() {
    this.id = this.route.snapshot.paramMap.get("id") || '';
    this.storageService.getStorageAllByWatchId(this.id).subscribe({
      next: (data) => {
        this.storages = data;
        if (this.storages && this.storages.length > 0) {
          const firstElement = this.storages[0];
          this.selectedImage = `http://localhost:8080/api/storage/image/download/${firstElement.idWatch}/${firstElement.name}`;
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  onImageClick(element: any): void {
    this.selectedImage = `http://localhost:8080/api/storage/image/download/${element.idWatch}/${element.name}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
