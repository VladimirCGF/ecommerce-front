import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {Coupon} from "../../../models/coupon.model";
import {CouponService} from "../../../services/coupon.service";
import {PaginatorIntl} from "../../../services/paginator-intl.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {LocalStorageService} from "../../../services/local-storage.service";


@Component({
  selector: 'app-coupon-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink, MatTableModule, MatPaginatorModule, MatButton, MatFormField, MatInput, MatIcon
    ],
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class CouponListComponent implements OnInit, AfterViewInit{

  coupon: Coupon[] = [];

  displayedColumns: string[] = ['id', 'code','discountPercentage', 'validUntil', 'options'];

  dataSource = new MatTableDataSource<Coupon>(this.coupon);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

  }

  constructor(private couponService: CouponService,
              private localStorage: LocalStorageService,) {
  }

  ngOnInit(): void {
    this.getCoupon();
  }

  getCoupon(): void {
    const token = this.localStorage.getItem('jwt_token');
    this.couponService.getCoupon(token).subscribe(data => {
      this.coupon = data;
      this.dataSource.data = this.coupon;
    });
  }

  onDelete(id: string) {
    const token = this.localStorage.getItem('jwt_token');
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
    if (confirmation) {
      this.couponService.deleteCoupon(token, id).subscribe(data => this.getCoupon());
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
