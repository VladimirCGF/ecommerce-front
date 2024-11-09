import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Stock} from "../../../models/stock.model";
import {StockService} from "../../../services/stock.service";
import {NgForOf} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    NgForOf,
    MatToolbar,
    RouterLink,
    MatFabButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    MatPaginator,
    MatFormField,
    MatInput
  ],
  templateUrl: './stock-list.component.html',
  styleUrls:['./stock-list.component.css'],
encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class StockListComponent implements OnInit, AfterViewInit {

  stock: Stock[] = [];

  displayedColumns: string[] = ['id', 'idWatch', 'quantity', 'options'];

  dataSource = new MatTableDataSource<Stock>(this.stock);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private stockService: StockService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getStock();
  }

  getStock(): void {
    this.stockService.getStock().subscribe(data => {
      this.stock = data;
      this.dataSource.data = this.stock;

    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.stockService.deleteStock(id).subscribe(data => this.getStock());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
