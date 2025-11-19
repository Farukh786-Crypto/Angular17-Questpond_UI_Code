import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, retry, Subject, take } from 'rxjs';
import { LoggerService } from '../../Services/_index';

@Component({
  selector: 'app-obervable-sample',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoggerService],
  templateUrl: './obervable-sample.component.html',
  styleUrls: ['./obervable-sample.component.css'],
})
export class ObervableSampleComponent {
  observableData: Observable<string> | undefined;
  subjectData: Subject<string> | undefined;
  loggrService = inject(LoggerService);

  constructor() {
    this.subjectData = new Subject<string>();
    this.loggrService.getName();
  }

  create() {
    // this.observableData = new Observable((observer) => {
    //   observer.next('test1');
    //   observer.next('test2');
    //   observer.next('test3'); // Emit multiple values
    //   setInterval(() => {
    //     observer.next('test' + Math.random()); // Emit a value every second
    //   }, 1000);

    //   setInterval(() => {
    //     observer.error('An error occurred'); // Emit an error after 10 seconds
    //     //observer.complete(); // Complete the observable after 10 seconds
    //   }, 10000);
    // });

    this.subjectData!.next('Subject Test 1');
    this.subjectData!.next('Subject Test 2');
  }

  operatorFunc() {
    this.observableData = this.observableData?.pipe(
      // Example operator: map
      map((data) => {
        console.log('Mapping data:', data); // Log the data being mapped
        return data.toUpperCase(); // Transform the data to uppercase
      }),
      //.filter((data) => data.indexOf('p')!=-1), // Filter out data with length <= 5
      //take(3), // show only 3 records
      retry(2) // Retry the observable up to 2 times on error
    );
    console.log('Observable created with operatorFunc');
  }

  fetch() {
    // this.observableData?.subscribe({
    //   next: (data) => {
    //     console.log('Data received:', data);
    //   },
    //   error: (error) => {
    //     console.error('Error occurred:', error);
    //   },
    //   complete: () => {
    //     console.log('Observable completed');
    //   },
    // });

    this.subjectData?.subscribe({
      next(value) {
        console.log('Subject Data received:', value);
      },
      error(err) {
        console.error('Subject Error occurred:', err);
      },
      complete() {
        console.log('Subject completed');
      },
    });
  }
}
