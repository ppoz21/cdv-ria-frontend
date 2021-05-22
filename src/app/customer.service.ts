import { Injectable } from '@angular/core';
import { Customer } from './customers';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private customersApiUrl = 'http://ria-backend.us-east-1.elasticbeanstalk.com/public/index.php/api/customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersApiUrl, httpOptions);
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersApiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  updateCustomer(customer: Customer): Observable<any> {
    const url = `${this.customersApiUrl}/${customer.id}`;
    return this.http.put(url, customer, httpOptions);
  }

  createCustomer(customer: Customer): Observable<Customer>
  {
    return this.http.post<Customer>(this.customersApiUrl, customer, httpOptions);
  }

  deleteCustomer(customer: Customer | number): Observable<Customer>
  {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersApiUrl}/${id}`;
    return this.http.delete<Customer>(url, httpOptions);
  }
}
