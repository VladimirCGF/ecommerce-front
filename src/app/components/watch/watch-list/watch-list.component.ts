import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {Watch} from "../../../models/watch.model";
import {WatchService} from "../../../services/watch.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PaginatorIntl} from "../../../services/paginator-intl.service";

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink, MatTableModule, MatPaginatorModule, MatButton, MatFormField, MatInput
  ],
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}],
})
export class WatchListComponent implements OnInit, AfterViewInit {

  watches: Watch[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'material', 'color', 'gender', 'brand', 'format', 'mechanism', 'options'];

  dataSource = new MatTableDataSource<Watch>(this.watches);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private watchService: WatchService) {
  }

  ngOnInit(): void {
    this.getWatches();
  }

  getWatches(): void {
    this.watchService.getWatches().subscribe(data => {
      this.watches = data;
      this.dataSource.data = this.watches;
    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.watchService.deleteWatch(id).subscribe(data => this.getWatches());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
