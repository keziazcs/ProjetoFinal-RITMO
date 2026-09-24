import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roteiro } from './roteiro';

describe('Roteiro', () => {
  let component: Roteiro;
  let fixture: ComponentFixture<Roteiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roteiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roteiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
