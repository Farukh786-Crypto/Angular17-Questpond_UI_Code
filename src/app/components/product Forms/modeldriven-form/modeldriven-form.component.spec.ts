import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeldrivenFormComponent } from './modeldriven-form.component';

describe('ModeldrivenFormComponent', () => {
  let component: ModeldrivenFormComponent;
  let fixture: ComponentFixture<ModeldrivenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeldrivenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeldrivenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
