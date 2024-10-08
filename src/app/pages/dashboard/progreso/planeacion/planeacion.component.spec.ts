import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneacionComponent } from './planeacion.component';

describe('PlaneacionComponent', () => {
  let component: PlaneacionComponent;
  let fixture: ComponentFixture<PlaneacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaneacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaneacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
