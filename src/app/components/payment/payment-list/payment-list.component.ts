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
import {Payment} from "../../../models/payment.model";
import {PaymentService} from "../../../services/payment.service";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-payment-list',
  standalone: true,
    imports: [
        DatePipe,
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
        MatFormField,
        MatInput,
        MatIcon
    ],
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}],
})
export class PaymentListComponent implements OnInit, AfterViewInit {

  payment: Payment[] = [];
  displayedColumns: string[] = ['id', 'price', 'paymentDateTime', 'paymentMethod', 'paymentStatus', 'idOrders', 'options'];

  dataSource = new MatTableDataSource<Payment>(this.payment);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private paymentService: PaymentService,
              private localStorage: LocalStorageService,) {
  }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.paymentService.getPayment(token).subscribe(data => {
      this.payment = data;
      this.dataSource.data = this.payment;
    });
  }

  onDelete(id: string) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.paymentService.deletePayment(token, id).subscribe(data => this.getPayment());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
