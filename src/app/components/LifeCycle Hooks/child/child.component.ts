import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../../../models/_index';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectionComponent } from '../projection/projection.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectionComponent], // added component here also added commonmodule also
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush     // apply changedetection here
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy {

  @Input() customers: Customer[];
  //@Input() custName!: string;

  constructor(private cdr: ChangeDetectorRef) {
    this.customers = [];
  }

  ngOnInit(): void {
    console.log('Child Component Initialized');
  }

  trackByCustomer(index: number, customer: Customer) {
    return customer.customerId;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges triggered", changes);
  }

  refresh() {
    // it will go and check for all change detacted data then bind to browser
    this.cdr.markForCheck;
  }

  ngOnDestroy(): void {
    console.log('Child Component Destroyed');
  }

}
