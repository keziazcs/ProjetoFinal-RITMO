import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloboRitmo } from './globo-ritmo';

describe('GloboRitmo', () => {
  let component: GloboRitmo;
  let fixture: ComponentFixture<GloboRitmo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GloboRitmo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloboRitmo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
