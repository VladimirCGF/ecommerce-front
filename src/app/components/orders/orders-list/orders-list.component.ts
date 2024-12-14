import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Orders} from "../../../models/orders.model";
import {OrdersService} from "../../../services/orders.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-orders-list',
  standalone: true,
    imports: [
        MatButton,
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
        MatHeaderCellDef,
        DatePipe,
        MatFormField,
        MatInput,
        MatIcon
    ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class OrdersListComponent implements OnInit, AfterViewInit {


  orders: Orders[] = [];

  displayedColumns: string[] = ['id', 'orderDate', 'totalPrice', 'idClient', 'idAddress', 'status', 'coupon', 'options'];

  dataSource = new MatTableDataSource<Orders>(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService,
              private localStorage: LocalStorageService,) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.ordersService.getOrders(token).subscribe(data => {
      this.orders = data;
      this.dataSource.data = this.orders;
    });
  }

  onDelete(id: string) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.ordersService.deleteOrders(token, id).subscribe(data => this.getOrders());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
