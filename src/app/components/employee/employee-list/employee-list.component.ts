import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Client} from "../../../models/client.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {ClientService} from "../../../services/client.service";
import {Employee} from "../../../models/employee.model";
import {EmployeeService} from "../../../services/employee.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-employee-list',
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
        MatIcon
    ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class EmployeeListComponent implements OnInit, AfterViewInit{

  employee: Employee[] = [];

  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'options'];

  dataSource = new MatTableDataSource<Employee>(this.employee);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private employeeService: EmployeeService,
              private localStorage: LocalStorageService,) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.employeeService.getEmployee(token).subscribe(data => {
      this.employee = data;
      this.dataSource.data = this.employee;
    });
  }

  onDelete(id: string) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.employeeService.deleteEmployee(token, id).subscribe(data => this.getEmployee());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
