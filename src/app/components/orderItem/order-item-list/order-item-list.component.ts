import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Stock} from "../../../models/stock.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {StockService} from "../../../services/stock.service";
import {OrderItem} from "../../../models/order-item.model";
import {OrderItemService} from "../../../services/order-item.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-order-item-list',
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
        MatHeaderCellDef,
        RouterLink,
        MatFormField,
        MatInput,
        MatIcon
    ],
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css'],
encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class OrderItemListComponent implements OnInit, AfterViewInit{

  orderItem: OrderItem[] = [];

  displayedColumns: string[] = ['id', 'idOrders', 'idWatch','quantity','price', 'options'];

  dataSource = new MatTableDataSource<OrderItem>(this.orderItem);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderItemService: OrderItemService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getOrderItem();
  }

  getOrderItem(): void {
    this.orderItemService.getOrderItem().subscribe(data => {
      this.orderItem = data;
      this.dataSource.data = this.orderItem;

    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.orderItemService.deleteOrderItem(id).subscribe(data => this.getOrderItem());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
