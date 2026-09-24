import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDia } from './check-dia';

describe('CheckDia', () => {
  let component: CheckDia;
  let fixture: ComponentFixture<CheckDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
