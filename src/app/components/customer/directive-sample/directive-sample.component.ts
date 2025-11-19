import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { DatatableComponent } from './datatable/datatable.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-directive-sample',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableComponent],
  templateUrl: './directive-sample.component.html',
  styleUrl: './directive-sample.component.css',
})
export class DirectiveSampleComponent {
  num!: number;
  colours!: string[];
  selectedColor: string = 'Red'; // Default selected color
  products: Product[] = [];
  id!: string;
  city!: string;
  country!: string;

  constructor(private activatedRoute: ActivatedRoute) {
    // Initialize the component
    this.num = 0;
    this.colours = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'];

    let product1 = new Product(1, 'ANG-001', 'Angular Book', 30);
    let product2 = new Product(2, 'REACT-001', 'React Book', 20);
    let product3 = new Product(3, 'VUE-001', 'Vue Book', 15);

    //this.products = [product1, product2, product3];

    this.products = [];
    // Push products into the products array
    this.products.push(product1);
    this.products.push(product2);
    this.products.push(product3);

    this.activatedRoute.params.subscribe((params) => {
      console.log('Route parameter id:', params['id']);
      this.id = params['id'];
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log('Query parameter city:', params.get('city'));
      console.log('Query parameter country:', params.get('country'));
      this.city = params.get('city') || '';
      this.country = params.get('country') || '';
    });
  }
}
