import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlowyButtonComponent } from './glowy-button.component';

describe('GlowyButtonComponent', () => {
  let component: GlowyButtonComponent;
  let fixture: ComponentFixture<GlowyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlowyButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlowyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
