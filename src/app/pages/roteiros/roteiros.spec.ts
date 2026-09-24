import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roteiros } from './roteiros';

describe('Roteiros', () => {
  let component: Roteiros;
  let fixture: ComponentFixture<Roteiros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roteiros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roteiros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
