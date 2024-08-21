import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocacionalComponent } from './vocacional.component';

describe('VocacionalComponent', () => {
  let component: VocacionalComponent;
  let fixture: ComponentFixture<VocacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocacionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
