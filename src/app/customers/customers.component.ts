import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  customers!: Customer[];

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  filter(ordersNo: number): void
  {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers.filter(c => c.ordersNo >= ordersNo));
  }

  // tslint:disable-next-line:variable-name
  create(firstName: string, lastName: string, street: string, number: string, flat: string | null,
         email: string, phoneNo: string, ordersNo: number): void
  {
    this.customerService.createCustomer({firstName, lastName,
      street, number, flat, email, phoneNo, ordersNo} as Customer)
      .subscribe(customer => { this.customers.push(customer); });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(c => c.id !== customer.id);
    this.customerService.deleteCustomer(customer).subscribe();
  }

  ngOnInit(): void {
    this.getCustomers();
  }
}
