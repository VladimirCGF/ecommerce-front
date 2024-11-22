import {Routes} from '@angular/router';
import {StateListComponent} from "./components/state/state-list/state-list.component";
import {StateFormComponent} from "./components/state/state-form/state-form.component";
import {MunicipalityListComponent} from "./components/municipality/municipality-list/municipality-list.component";
import {MunicipalityFormComponent} from "./components/municipality/municipality-form/municipality-form.component";
import {WatchListComponent} from "./components/watch/watch-list/watch-list.component";
import {WatchFormComponent} from "./components/watch/watch-form/watch-form.component";
import {CouponListComponent} from "./components/coupon/coupon-list/coupon-list.component";
import {CouponFormComponent} from "./components/coupon/coupon-form/coupon-form.component";
import {StockListComponent} from "./components/stock/stock-list/stock-list.component";
import {StockFormComponent} from "./components/stock/stock-form/stock-form.component";
import {ClientListComponent} from "./components/client/client-list/client-list.component";
import {ClientFormComponent} from "./components/client/client-form/client-form.component";
import {AddressListComponent} from "./components/address/address-list/address-list.component";
import {AddressFormComponent} from "./components/address/address-form/address-form.component";
import {EmployeeListComponent} from "./components/employee/employee-list/employee-list.component";
import {EmployeeFormComponent} from "./components/employee/employee-form/employee-form.component";
import {OrderItemListComponent} from "./components/orderItem/order-item-list/order-item-list.component";
import {OrderItemFormComponent} from "./components/orderItem/order-item-form/order-item-form.component";
import {OrdersFormComponent} from "./components/orders/orders-form/orders-form.component";
import {OrdersListComponent} from "./components/orders/orders-list/orders-list.component";
import {HomeComponent} from "./components/home/home.component";
import {PaymentListComponent} from "./components/payment/payment-list/payment-list.component";
import {PaymentFormComponent} from "./components/payment/payment-form/payment-form.component";
import {WatchCardListComponent} from "./components/watch/watch-card-list/watch-card-list.component";
import {StorageListComponent} from "./components/storage/storage-list/storage-list.component";
import {StorageFormComponent} from "./components/storage/storage-form/storage-form.component";
import {WatchViewComponent} from "./components/watch/watch-view/watch-view.component";

export const routes: Routes = [
  {
    path: 'states', component: StateListComponent
  },
  {
    path: 'states/create', component: StateFormComponent
  },
  {
    path: 'states/update/:id', component: StateFormComponent
  },
  {
    path: 'municipality', component: MunicipalityListComponent
  },
  {
    path: 'municipality/create', component: MunicipalityFormComponent
  },
  {
    path: 'municipality/update/:id', component: MunicipalityFormComponent
  },
  {
    path: 'watches', component: WatchListComponent
  },
  {
    path: 'watches/create', component: WatchFormComponent
  },
  {
    path: 'watches/update/:id', component: WatchFormComponent
  }, {
    path: 'watches/view/:id', component: WatchViewComponent
  },
  {
    path: 'coupon', component: CouponListComponent
  },
  {
    path: 'coupon/create', component: CouponFormComponent
  },
  {
    path: 'coupon/update/:id', component: CouponFormComponent
  },
  {
    path: 'stock', component: StockListComponent, title: 'Controle de Stock'
  },
  {
    path: 'stock/create', component: StockFormComponent, title: 'Controle de Stock'
  },
  {
    path: 'stock/update/:id', component: StockFormComponent, title: 'Controle de Stock'
  },
  {
    path: 'client', component: ClientListComponent, title: 'Controle de Client'
  },
  {
    path: 'client/create', component: ClientFormComponent, title: 'Controle de Client'
  },
  {
    path: 'client/update/:id', component: ClientFormComponent, title: 'Controle de Client'
  },
  {
    path: 'address', component: AddressListComponent, title: 'Controle de Endereço'
  },
  {
    path: 'address/create', component: AddressFormComponent, title: 'Controle de Endereço'
  },
  {
    path: 'address/update/:id', component: AddressFormComponent, title: 'Controle de Endereço'
  },
  {
    path: 'employee', component: EmployeeListComponent, title: 'Controle de Funcionário'
  },
  {
    path: 'employee/create', component: EmployeeFormComponent, title: 'Controle de Funcionário'
  },
  {
    path: 'employee/update/:id', component: EmployeeFormComponent, title: 'Controle de Funcionário'
  },
  {
    path: 'orderItem', component: OrderItemListComponent, title: 'Controle de OrderItem'
  },
  {
    path: 'orderItem/create', component: OrderItemFormComponent, title: 'Controle de OrderItem'
  },
  {
    path: 'orderItem/update/:id', component: OrderItemFormComponent, title: 'Controle de OrderItem'
  },
  {
    path: 'orders', component: OrdersListComponent, title: 'Controle de Orders'
  },
  {
    path: 'orders/create', component: OrdersFormComponent, title: 'Controle de Orders'
  },
  {
    path: 'orders/update/:id', component: OrdersFormComponent, title: 'Controle de Orders'
  },
  {
    path: 'payment', component: PaymentListComponent, title: 'Controle de Pagamento'
  },
  {
    path: 'payment/create', component: PaymentFormComponent, title: 'Controle de Pagamento'
  },
  {
    path: 'payment/update/:id', component: PaymentFormComponent, title: 'Controle de Pagamento'
  },
  {
    path: 'storage', component: StorageListComponent, title: 'Controle de Storage'
  },
  {
    path: 'storage/create', component: StorageFormComponent, title: 'Controle de Storage'
  },
  {
    path: 'storage/update/:id', component: StorageFormComponent, title: 'Controle de Storage'
  },
  {
    path: 'home', component: HomeComponent, title: 'Inicio'
  },
  {
    path: 'ecommerce', component: WatchCardListComponent, title: 'Lista de Cards de Watch'
  }
];
