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
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PaginatorIntl} from "../../../services/paginator-intl.service";

@Component({
  selector: 'app-client-list',
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
    MatInput
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class ClientListComponent implements OnInit, AfterViewInit {

  client: Client[] = [];

  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'cpf', 'options'];

  dataSource = new MatTableDataSource<Client>(this.client);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.clientService.getClient().subscribe(data => {
      this.client = data;
      this.dataSource.data = this.client;

    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.clientService.deleteClient(id).subscribe(data => this.getClient());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
