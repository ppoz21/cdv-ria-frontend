import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../customer.service';
import { Customer } from '../customers';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location
  ) { }

  customer!: Customer;

  getCustomer(): void {
    const id = +this!.route!.snapshot!.paramMap!.get('id')!;
    this.customerService.getCustomer(id).subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe( () => this.goBack());
  }

  ngOnInit(): void {
    this.getCustomer();
  }

}
