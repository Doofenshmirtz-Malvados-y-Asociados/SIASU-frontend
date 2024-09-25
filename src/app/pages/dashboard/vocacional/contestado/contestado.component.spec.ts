import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestadoComponent } from './contestado.component';

describe('ContestadoComponent', () => {
  let component: ContestadoComponent;
  let fixture: ComponentFixture<ContestadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
