import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {State} from "../../../models/state.model";
import {StateService} from "../../../services/state.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-state-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink, MatTableModule, MatPaginatorModule, MatButton, MatFormField, MatInput, MatIcon
    ],
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css'],
encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class StateListComponent implements OnInit, AfterViewInit {

  states: State[] = [];
  displayedColumns: string[] = ['id', 'name', 'abbreviations', 'options'];

  dataSource = new MatTableDataSource<State>(this.states);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private stateService: StateService) {
  }

  ngOnInit(): void {
    this.getState();
  }

  getState(): void {
    this.stateService.getStates().subscribe(data => {
      this.states = data;
      this.dataSource.data = this.states;
    });
  }

  onDelete(id: string) {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.stateService.deleteState(id).subscribe(data => this.getState());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

