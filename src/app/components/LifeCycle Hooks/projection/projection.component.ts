import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.css'
})
export class ProjectionComponent implements OnInit, AfterContentInit {
  currentDate: Date;

  @ContentChild('h2')
  header!: ElementRef;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    console.log("Projection Initialized", this.header);
  }

  // header object information get in only below event not in ngOninit
  ngAfterContentInit(): void {
    console.log("ngAfterContent Initialized", this.header);
    if (this.header) {
      this.header.nativeElement.innerText = this.header.nativeElement.innerText + ".Thank You";
    }
  }
}
