import { Component, inject } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoggerService } from '../../Services/logger.service';
import { MypipePipe } from '../../custom/Pipes/mypipe.pipe';

@Component({
  selector: 'app-pipe-sample',
  standalone: true,
  imports: [CommonModule, MypipePipe, RouterModule],
  providers: [LoggerService],
  templateUrl: './pipe-sample.component.html',
  styleUrl: './pipe-sample.component.css',
})
export class PipeSampleComponent {
  product!: Product;
  date!: Date;
  router = inject(Router);
  loggerService = inject(LoggerService);

  constructor() {
    this.date = new Date();
    this.product = new Product(1, 'ANG-001', 'Angular Book', 30);

    this.loggerService.setName('Angular Developer' + Math.random());
  }

  onRedirect() {
    this.router.navigate(['dir', this.product.productId], {
      queryParams: { city: 'Hyderabad', country: 'India' },
    });
  }
}
