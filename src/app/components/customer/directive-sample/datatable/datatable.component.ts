import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { FavsDirective } from '../../../../custom/Directives/favs.directive';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FavsDirective],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() selectedColor: string = 'Red'; // Default selected color

  ngOnInit(): void {
    // Initialization logic can go here if needed
    if (Array.isArray(this.products)) {
      console.log('Products:', this.products);
    }
  }

  //   When you use *ngFor, Angular re-renders the entire list by default whenever your data changes, 
  //   even if only one item changed.
  //   Solution: use the trackBy function.
  // This tells Angular how to uniquely identify each row, so it can reuse DOM elements efficiently.

  trackByProduct(index: number, product: any): number {
    return product.id; // or a unique property like product.code
  }

  addNewProductButton() {
    this.products.push({
      productId: this.products.length + 1,
      productCode: 'Asus',
      productName: 'Laptop',
      price: Math.floor(Math.random() * 100) + 1,
    });
    console.log('New product added:', this.products[this.products.length - 1]);
  }
}
