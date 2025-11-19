import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { MessageService, ProductService } from '../../../Services/_index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-template-driven-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductService, MessageService],
  templateUrl: './product-template-driven-form.component.html',
  styleUrl: './product-template-driven-form.component.css',
})
export class ProductTemplateDrivenFormComponent implements OnInit, OnDestroy {
  product: Product = new Product(); // Declare and initialize the property here
  isEditMode: boolean = false;
  subscription: Subscription[] = [];

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let productId = params['id'];
      if (productId) {
        this.isEditMode = true;
        // get data through id
        this.getFormById(productId);
      }
    })
  }

  getFormById(pid: number) {
    let getIdSub = this.productService.getProductById(pid).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error(err) {
        console.error('Error loading product:', err);
      },
      complete() {
        console.log('Load product operation completed.');
      }
    })

    this.subscription.push(getIdSub);
  }

  onFormControl(frm: NgForm, controlName: string) {
    return (
      frm.controls[controlName]?.invalid &&
      (frm.controls[controlName]?.touched || frm.controls[controlName]?.dirty)
    );
  }

  // Used to check for specific validation errors like 'required', 'pattern', etc.
  hasError(frm: NgForm, controlName: string, errorType: string): boolean {
    return (
      frm.controls[controlName]?.errors?.[errorType] &&
      (frm.controls[controlName]?.touched || frm.controls[controlName]?.dirty)
    );
  }

  newProduct() {
    this.isEditMode = false;
    this.product = new Product();
  }

  onSubmit(form: NgForm) {
    debugger
    //console.log(form, 'Form Submitted!');
    // Mark all controls as touched
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsTouched();
    });

    if (form.valid) {
      this.productService.addProduct(form.value).subscribe({
        next: (result: boolean) => {
          debugger
          if (result) {
            this.messageService.notifyMessage('Product added successfully!');
            console.log('Product added successfully:', result);
          }
        },
        error(err) {
          console.error('Error adding product:', err);
        },
        complete() {
          console.log('Form Submitted!', form);
          form.resetForm(); // Reset the form after submission
        },

      });

    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
