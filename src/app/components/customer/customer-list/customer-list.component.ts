import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  @Input() customers!: string[];
  @Output() selectedCustomer: EventEmitter<string> = new EventEmitter<string>();
  customerList: string[] = [];

  ngOnInit(): void {
    this.customerList = this.customers;
    console.log(
      'CustomerListComponent initialized with customerList:',
      this.customerList
    );
  }

  onSelectCustomer(customer: string) {
    this.selectedCustomer.emit(customer);
    console.log('Selected customer:', customer);
  }
}
