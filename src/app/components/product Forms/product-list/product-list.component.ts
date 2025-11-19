import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MessageService, ProductService } from '../../../Services/_index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductService, MessageService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Array to hold all subscribtions
  private subscription: Subscription[] = [];
  products!: Product[];

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    // load products on component init
    this.loadProcuts();
  }

  trackByProductId(index: number, product: Product): number {
    return product.productId;
  }

  loadProcuts() {
    const sub = this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        if (Array.isArray(products)) {
          this.messageService.notifyMessage(`Loaded ${products.length} products successfully!`);
          console.log('Products loaded:', products);
          this.products = products;
        }
      },
      error(err) {
        console.error('Error loading products:', err);
      },
      complete() {
        console.log('Load products operation completed.');
      }
    })
    this.subscription.push(sub);
  }

  editProduct(product: Product) {
    this.router.navigate(['/templateForm'], { queryParams: { id: product.productId } });
  }

  deleteProduct(product: Product) {
    let confirmDelete = confirm(`Are you sure you want to delete this product ${product.productName}?`);
    if (!confirmDelete) {
      return;
    }
    debugger
    const deleteSub = this.productService.deleteProduct(product.productId).subscribe({
      next: (result: boolean) => {
        debugger
        if (result) {
          this.messageService.notifyMessage('Product deleted successfully!');
          console.log('Product deleted successfully:', result);
          this.loadProcuts(); // Refresh the product list after deletion
        }
      },
      error(err) {
        console.error('Error deleting product:', err);
      },
      complete() {
        console.log('Delete product operation completed.');
      }
    })
    this.subscription.push(deleteSub);
    // calle get api again for refresh list
    this.loadProcuts();
  }

  ngOnDestroy(): void {
    // unsubscribe to prevent memory leaks
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
