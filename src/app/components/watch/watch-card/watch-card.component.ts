import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Watch} from "../../../models/watch.model";
import {WatchService} from "../../../services/watch.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

type Images = {
  imageUrls: string;
  nameImage: string;
}

@Component({
  selector: 'app-watch-card',
  templateUrl: './watch-card.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    NgIf,
    MatIconButton,
    MatIcon,
    MatCardHeader,
    NgClass,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    RouterLink,
    MatHeaderCellDef
  ],
  styleUrls: ['./watch-card.component.css']
})
export class WatchCardComponent implements OnInit, AfterViewInit {

  watch: Watch | null = null;
  imageName: string = '';
  images: Images[] = [];

  displayedColumns: string[] = ['imageUrls', 'nameImage','options'];

  dataSource = new MatTableDataSource<Images>(this.images);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectedFile: File | null = null;
  private id: string | null | undefined;

  constructor(private watchService: WatchService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get("id");
      if (this.id) {
        this.watchService.getWatchById(this.id).subscribe(data => {
          this.watch = data;
          console.log(this.watch);
        }, error => {
          console.error("Erro ao buscar os dados do relógio:", error);
        });
      } else {
        console.error("Watch ID não encontrado na URL.");
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      this.selectedFile = file;
    } else {
      console.log("No file selected.");
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.watch) {
      console.log('Dados enviados:', this.watch.id, this.selectedFile.name, this.selectedFile);
      this.watchService.uploadImage(this.watch.id, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: (response) => {
            if (this.watch?.imageUrls) {
              this.watch?.imageUrls.push(this.imageName);
              this.uploadListImageUrls();
            }
            console.log('Upload successful:', response);
          },
          error: (error) => {
            console.error('Upload failed:', error);
          }
        });
    } else {
      console.error('No file selected or Watch ID missing.');
    }
  }

  uploadListImageUrls(): void {
    if (this.watch?.imageUrls) {
      this.watch?.imageUrls.push(this.imageName);
      this.watchService.updateListImage(this.watch?.id, this.watch)
        .subscribe({
          next: (response) => {
            console.log('UpdateList successful:', response);
          },
          error: (error) => {
            console.error('UpdateList failed:', error);
          }
        });
    }
  }

}
