import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Municipality} from "../../../models/municipality.model";
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
import {MunicipalityService} from "../../../services/municipality.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-municipality-list',
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
  templateUrl: './municipality-list.component.html',
  styleUrls: ['./municipality-list.component.css'],
encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class MunicipalityListComponent implements OnInit, AfterViewInit {

  municipality: Municipality[] = [];

  displayedColumns: string[] = ['id', 'name', 'state','options'];

  dataSource = new MatTableDataSource<Municipality>(this.municipality);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private municipalityService: MunicipalityService) {
  }

  ngOnInit(): void {
    this.getMunicipality();
  }

  getMunicipality(): void {
    this.municipalityService.getMunicipality().subscribe(data => {
      this.municipality = data;
      this.dataSource.data = this.municipality;

    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.municipalityService.deleteMunicipality(id).subscribe(data => this.getMunicipality());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
