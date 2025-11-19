import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFavs]',
  standalone: true,
})
export class FavsDirective {
  private isLiked: boolean = true;
  // expose same name as the directive selector
  @Input('appFavs') color: string | undefined;
  constructor(private ele: ElementRef) {
    console.log('FavsDirective initialized', this.ele.nativeElement);
    this.update();
  }

  @HostListener('click')
  onClick() {
    this.update();
  }

  // @HostListener('mouseover')
  // onMouseHoverEvent() {
  //   this.ele.nativeElement.style.color = 'blue'; // Change color on hover
  // }

  // @HostListener('mouseout')
  // onMouseOutEvent() {
  //   this.ele.nativeElement.style.color = 'yellow'; // Change color on hover
  // }

  update() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.ele.nativeElement.style.color = this.color;
      (this.ele.nativeElement as HTMLInputElement).value = 'Like';
    } else {
      this.ele.nativeElement.style.color = this.color;
      (this.ele.nativeElement as HTMLInputElement).value = 'Unlike';
    }

    console.log(
      'this.ele.nativeElement.textContent',
      this.ele.nativeElement.textContent
    );
  }
}
