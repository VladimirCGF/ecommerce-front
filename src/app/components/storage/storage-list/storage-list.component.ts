import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Storage} from "../../../models/storage.model";
import {StorageService} from "../../../services/storage.service";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatCardImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {LocalStorageService} from "../../../services/local-storage.service";


@Component({
  selector: 'app-storage-list',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    RouterLink,
    MatCardImage,
    MatIcon
  ],
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}],
})
export class StorageListComponent implements OnInit, AfterViewInit {

  storages: Storage[] = [];

  displayedColumns: string[] = ['id', 'idWatch', 'name', 'url', 'options'];

  dataSource = new MatTableDataSource<Storage>(this.storages);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private storageService: StorageService,
              private localStorage: LocalStorageService,) {
  }

  ngOnInit(): void {
    this.getStorages();
  }

  getStorages(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.storageService.getStorages().subscribe(data => {
      this.storages = data;
      this.dataSource.data = this.storages;
    });
  }

  onDelete(id: string) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.storageService.deleteStorage(token, id).subscribe(data => this.getStorages());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
