export class Product {
  productId!: number;
  productCode!: string;
  productName!: string;
  price!: number;

  constructor(ProductId?: number, ProductCode?: string, ProductName?: string, Price?: number) {
    this.productId = ProductId ?? 0;
    this.productCode = ProductCode ?? '';
    this.productName = ProductName ?? '';
    this.price = Price ?? 0;
  }
}
