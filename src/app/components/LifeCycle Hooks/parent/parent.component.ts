import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../models/_index';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit {
  customer: Customer;
  customers: Customer[] = [];

  constructor() {
    this.customer = new Customer();
  }

  ngOnInit(): void {
    console.log('Parent Component Initialized');
  }

  add() {
    alert(`Customer Added: ${this.customer.customerId} - ${this.customer.customerName}`);
    let ob = Object.assign({}, this.customer);
    this.customers.push(ob);
    // clear the form
    this.customer = new Customer();
  }

}
