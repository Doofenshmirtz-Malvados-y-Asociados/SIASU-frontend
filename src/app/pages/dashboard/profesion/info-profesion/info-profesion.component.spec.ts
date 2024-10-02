import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfesionComponent } from './info-profesion.component';

describe('InfoProfesionComponent', () => {
  let component: InfoProfesionComponent;
  let fixture: ComponentFixture<InfoProfesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProfesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProfesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
