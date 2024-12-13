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
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-address-list',
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
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class AddressListComponent implements OnInit, AfterViewInit {

  address: Address[] = [];

  displayedColumns: string[] = ['id', 'address', 'state', 'municipality', 'cep', 'idClient', 'options'];

  dataSource = new MatTableDataSource<Address>(this.address);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.addressService.getAddress().subscribe(data => {
      this.address = data;
      this.dataSource.data = this.address;

    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.addressService.deleteAddress(id).subscribe(data => this.getClient());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
