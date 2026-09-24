import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextoDoDia } from './contexto-do-dia';

describe('ContextoDoDia', () => {
  let component: ContextoDoDia;
  let fixture: ComponentFixture<ContextoDoDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextoDoDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextoDoDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
