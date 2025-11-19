import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObervableSampleComponent } from './obervable-sample.component';

describe('ObervableSampleComponent', () => {
  let component: ObervableSampleComponent;
  let fixture: ComponentFixture<ObervableSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObervableSampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObervableSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
