import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsSectionComponent } from './functions-section.component';

describe('FunctionsSectionComponent', () => {
  let component: FunctionsSectionComponent;
  let fixture: ComponentFixture<FunctionsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
