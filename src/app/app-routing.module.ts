import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent, data: {title: 'Customers | SCM'} },
  { path: 'customers/details/:id', component: CustomerDetailsComponent, data: {title: 'Customer Details | SCM'} },
  { path: '404', component: NotFoundComponent, data: {title: 'Page not found | SCM'}},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
