import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinePage } from './routine.page';

describe('RoutinePage', () => {
  let page: RoutinePage;
  let fixture: ComponentFixture<RoutinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinePage);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
